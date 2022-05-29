import { GetStaticProps, NextPage } from 'next'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getSunTimes } from '../../utils/Time/suncalc'
import { getWorldRadiationEstimatedActuals, getWorldRadiationForecasts } from '../../api/Solcast'

import { useUserLocation } from '../../context/Location'
import { loadingController } from '@ionic/core'
import { bookOutline, downloadOutline } from 'ionicons/icons'
import { downloadData } from '../../utils/Notifications/downloadData'
import { WorldRadiationData } from '../../api/Solcast/constants'

import Toolbar from '../../components/Toolbar'
import GetCurrentLocation from '../../components/Home/GetCurrentLocation'
import ChartSlides from '../../components/ChartSlides'

import { useRouter } from 'next/router'
import { routes } from '../../utils/Navigation/routes'

interface ForecastsProps {
  apiUrl: string
}

interface ChartSlidesDataInterface {
  [key: string]: {
    data: WorldRadiationData[],
    summary: WorldRadiationData
  }
}

const Forecasts: NextPage<ForecastsProps> = ({ apiUrl }) => {
  const router = useRouter()
  const { data: location } = useUserLocation()

  const loader = useMemo(async () => {
    const loader = await loadingController.create({
      message: "Fetching data..."
    })

    return loader
  }, [])

  const [chartSlidesData, setChartsSlideData] = useState<ChartSlidesDataInterface>({})
  const [forecastData, setForecastData] = useState<WorldRadiationData[]>([])
  const [loading, setLoading] = useState(false)

  const redirectTo = (route: string) => {
    router.push(route)
  }

  useEffect(() => {
    if (!location)
      return

    const { latitude, longitude } = location

    const retrieveData = async () => {
      try {
        const forecasts = await getWorldRadiationForecasts(latitude, longitude, 72, "json", apiUrl)
        const estimates = await getWorldRadiationEstimatedActuals(latitude, longitude, 72, "json", apiUrl)

        const data = forecasts.forecasts.concat(estimates.estimated_actuals).sort(
          (current, next) => new Date(current.period_end).getTime() - new Date(next.period_end).getTime()
        )

        setForecastData(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    setLoading(true)
    retrieveData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const toggleLoader = async (loading: boolean) => {
    if (!loading) {
      (await loader).dismiss()

      return
    }

    (await loader).present()
  }

  useEffect(() => {
    toggleLoader(loading)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  useEffect(() => {
    if (!location)
      return

    const { latitude, longitude } = location

    const filterDataByTimePeriod = (forecastData: WorldRadiationData[], targetDate: Date, latitude: number, longitude: number) => {
      const times = getSunTimes(targetDate, latitude, longitude)
      const dawn = times.dawn.getTime()
      const dusk = times.dusk.getTime()

      const filterByDay = ({ period_end }: WorldRadiationData) => {
        const periodEndDate = new Date(period_end)
        const periodEndTime = periodEndDate.getTime()

        return periodEndTime > dawn && periodEndTime < dusk
      }

      const data = forecastData.filter(filterByDay)

      return data
    }

    const groupedData = (data: WorldRadiationData[]) => {
      if (!data[0])
        return {}

      const result: {
        [key: string]: {
          data: WorldRadiationData[],
          summary: WorldRadiationData
        }
      } = {}
      let group: WorldRadiationData[] = []
      let id = new Date(data[0].period_end).toDateString()

      data.forEach((element) => {
        const periodDate = new Date(element.period_end)
        const date = periodDate.toDateString()

        if (date !== id) {
          const data = filterDataByTimePeriod(group, new Date(id), latitude, longitude)

          result[id] = {
            data,
            // @ts-ignore
            summary: data.reduce((acc, val) => {
              for (let key in val) {
                if (key !== "dni" && key !== "ebh" && key !== "dhi" && key !== "ghi")
                  continue

                // @ts-ignore
                if (acc[key] === undefined) {
                  // @ts-ignore
                  acc[key] = 0
                }
                // @ts-ignore
                acc[key] += val[key]
              }

              // @ts-ignore
              return acc
            }, {})
          }

          id = date
          group = []
        }

        group.push(element)
      })

      return result
    }

    const data = groupedData(forecastData)

    setChartsSlideData(
      data
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forecastData])

  if (!location) {
    return (
      <>
        <ion-header translucent>
          <Toolbar name='Forecasts' />
        </ion-header>
        <ion-content>
          <GetCurrentLocation />
        </ion-content>
      </>
    )
  }

  return (
    <>
      <ion-header translucent>
        <Toolbar name='Forecasts' options={[
          {
            icon: bookOutline,
            handler: () => redirectTo(routes["GLOSSARY"])
          }
        ]} />
      </ion-header>
      <ion-content fullscreen>
        {
          !loading &&
          <ChartSlides
            location={location}
            slidesData={chartSlidesData}
          />
        }
      </ion-content>
      {
        !loading &&
        <ion-fab vertical="bottom" horizontal="end">
          <ion-fab-button onClick={() => downloadData(location, apiUrl)}>
            <ion-icon icon={downloadOutline} />
          </ion-fab-button>
        </ion-fab>
      }
    </>
  )
}

export const getStaticProps: GetStaticProps<ForecastsProps> = async () => {
  return {
    props: {
      apiUrl: process.env.API_BASE_URL || "https://reenergize-server.herokuapp.com/"
    }
  }
}

export default Forecasts