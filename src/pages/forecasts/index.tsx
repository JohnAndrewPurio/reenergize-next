import { GetStaticProps, NextPage } from 'next'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getSunTimes } from '../../utils/Time/suncalc'
import { getWorldRadiationEstimatedActuals, getWorldRadiationForecasts } from '../../api/Solcast'

import DataChart from '../../components/DataChart'
import Toolbar from '../../components/Toolbar'

import { useUserLocation } from '../../context/Location'
import { roundAccurately } from '../../utils/Numbers'
import { glossary, units } from '../../api/Solcast/glossary'
import Loading from '../../components/Loading/Loading'
import { loadingController } from '@ionic/core'

interface ForecastsProps {
  apiUrl: string
}

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

  useEffect(() => {
    if (!location)
      return

    const { latitude: longitude, longitude: latitude } = location

    const retrieveData = async () => {
      try {
        const forecasts = await getWorldRadiationForecasts(apiUrl, latitude, longitude)
        const estimates = await getWorldRadiationEstimatedActuals(apiUrl, latitude, longitude)

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

    const { latitude: longitude, longitude: latitude } = location

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
          <ion-text color="danger">Missing Coordinates</ion-text>
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
                {
                  chartData &&
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
                }
              </div>
              <ion-card-header>
                <ion-card-subtitle>Lucena, Quezon</ion-card-subtitle>
              </ion-card-header>
            </ion-card>
            <ion-card class="ion-padding ion-margin">
              <ion-card-content>
                <ion-list>
                  <ion-item-group>
                    <ion-list-header>
                      <ion-label>Daytime Averages</ion-label>
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
                  </ion-item-group>
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