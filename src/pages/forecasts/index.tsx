import { GetStaticProps, NextPage } from 'next'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getSunTimes } from '../../utils/Time/suncalc'
import { getWorldRadiationEstimatedActuals, getWorldRadiationForecasts } from '../../api/Solcast'

import DataChart from '../../components/DataChart'
import Toolbar from '../../components/Toolbar'

import { useUserLocation } from '../../context/Location'
import { roundAccurately } from '../../utils/Numbers'
import { glossary, units } from '../../api/Solcast/glossary'
import { loadingController } from '@ionic/core'
import { downloadOutline } from 'ionicons/icons'
import { getFileUri, openFile, writeToFile } from '../../utils/Filesystem'
import { showNotification } from '../../utils/Notifications'
import { ActionPerformed, LocalNotifications } from '@capacitor/local-notifications'
import { showToast } from '../../utils/Toast'
import GetCurrentLocation from '../../components/Home/GetCurrentLocation'

interface ForecastsProps {
  apiUrl: string
}

const dateFormatOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

const Forecasts: NextPage<ForecastsProps> = ({ apiUrl }) => {
  const { data: location } = useUserLocation()

  const loader = useMemo(async () => {
    const loader = await loadingController.create({
      message: "Fetching data..."
    })

    return loader
  }, [])

  const [chartData, setChartData] = useState<any[]>([])
  const [forecastData, setForecastData] = useState<any>([])
  const [targetDate, setTargetDate] = useState<Date>(new Date())
  const [loading, setLoading] = useState(false)

  const dataSums = JSON.parse(JSON.stringify(chartData)).reduce((acc: any, data: any) => {
    for (let key in data) {
      if (typeof data[key] !== "number")
        continue

      if (acc[key] === undefined)
        acc[key] = 0

      acc[key] += data[key]
    }

    return acc
  }, {})

  const showCurrentData = (targetDate: Date, latitude: number, longitude: number) => {
    const times = getSunTimes(targetDate, latitude, longitude)
    const dawn = times.dawn.getTime()
    const dusk = times.dusk.getTime()

    const filterByDay: any = ({ period_end }: any) => {
      const periodEndDate = new Date(period_end)
      const periodEndTime = periodEndDate.getTime()

      return periodEndTime > dawn && periodEndTime < dusk
    }

    const data = forecastData.filter(filterByDay).sort((current: any, next: any) => new Date(current.period_end).getTime() - new Date(next.period_end).getTime())

    setChartData(data)
  }

  const downloadData = async () => {
    if (!location)
      return

    const { latitude, longitude } = location
    const format = "csv"
    const fileName = `${new Date().toDateString()}.${format}`
    const path = `/forecasts/${fileName}`

    try {
      const data = await getWorldRadiationForecasts(latitude, longitude, 72, format, apiUrl) as any

      await writeToFile(data, path)

      const { uri } = await getFileUri(path)

      console.log("Uri:", uri)

      showNotification([
        {
          id: 1,
          title: "File downloaded",
          body: "/storage/emulated/0/Documents/ReEnergize" + path,
          smallIcon: "small.png",
          largeIcon: "large.png"
        }
      ])

      const tapHandler = async (event: ActionPerformed) => {
        if (event.actionId !== "tap")
          return

        try {
          await openFile(uri)
        } catch (error) {
          console.log(error)
        } finally {
          LocalNotifications.removeAllListeners()
        }
      }

      LocalNotifications.addListener("localNotificationActionPerformed", tapHandler)
    } catch (e) {
      const { message } = e as Error

      console.log(message)
      showToast({
        text: message,
        duration: "long"
      })
    }
  }

  useEffect(() => {
    if (!location)
      return

    const { latitude, longitude } = location

    const retrieveData = async () => {
      try {
        const forecasts = await getWorldRadiationForecasts(latitude, longitude, 72, "json", apiUrl)
        const estimates = await getWorldRadiationEstimatedActuals(latitude, longitude, 72, "json", apiUrl)

        setForecastData([
          ...forecasts.forecasts,
          ...estimates.estimated_actuals
        ])
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

    showCurrentData(targetDate, latitude, longitude)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forecastData, location, targetDate])

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
        <Toolbar name='Forecasts' />
      </ion-header>
      <ion-content fullscreen>
        {
          !loading && <>
            <ion-card class="ion-padding ion-margin">
              <div className="chart">
                <DataChart
                  labels={chartData.map(({ period_end }) => new Date(period_end))}
                  chartData={[
                    {
                      label: "GHI (W/m2)",
                      borderColor: "#9ACD32",
                      data: chartData.map(({ ghi }) => ghi),
                      borderJoinStyle: "round",
                      fill: "start"
                    }
                  ]}
                />
              </div>
              <ion-card-header>
                <ion-card-title class="ion-text-center">{targetDate.toLocaleDateString(undefined, dateFormatOptions)}</ion-card-title>
                <ion-card-subtitle class="ion-text-center">{location.address}</ion-card-subtitle>
              </ion-card-header>
            </ion-card>
            <ion-card class="ion-padding ion-margin">
              <ion-card-content>
                <ion-list>
                  <ion-list-header>
                    Daytime Averages
                  </ion-list-header>
                  {
                    Object.entries(dataSums).map(([key, value]) => (
                      <ion-item key={key}>
                        <ion-label>
                          <h5>
                            {
                              //@ts-ignore
                              glossary[key]
                            }:
                          </h5>
                          <p>{roundAccurately(value as number / chartData.length, 4)}</p>
                        </ion-label>
                        <ion-note slot="end">
                          {
                            //@ts-ignore
                            units[key]
                          }
                        </ion-note>
                      </ion-item>
                    ))
                  }
                </ion-list>
              </ion-card-content>
            </ion-card>
          </>
        }


        <style jsx>{`
          .chart {
            height: 250px;
          }
        `}</style>
      </ion-content>
      {
        !loading &&
        <ion-fab vertical="bottom" horizontal="end">
          <ion-fab-button onClick={downloadData}>
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