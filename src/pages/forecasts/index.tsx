import { GetStaticProps, NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { getSunTimes } from '../../utils/Time/suncalc'
import { getWorldRadiationEstimatedActuals, getWorldRadiationForecasts } from '../../api/Solcast'

import DataChart from '../../components/DataChart'
import Toolbar from '../../components/Toolbar'

import { getValue } from '../../utils/Storage'
import { Position } from '@capacitor/geolocation'

interface ForecastsProps {
  apiUrl: string
}

const Forecasts: NextPage<ForecastsProps> = ({ apiUrl }) => {
  const iframeCard = useRef<HTMLIonCardElement>()
  const [location, setLocation] = useState<Position>()
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    const retrieveUserLocation = async () => {
      try {
        const location = await getValue("location")

        console.log("Location:", location)

        setLocation(location)
      } catch (error) {
        console.log(error)
      }
    }

    const retrieveData = async () => {
      const currentDate = new Date()

      const latitude = 13.93139
      const longitude = 121.61722
      const times = getSunTimes(currentDate, latitude, longitude)
      const dawn = times.dawn.getTime()
      const dusk = times.dusk.getTime()

      const filterByDay: any = ({ period_end }: any) => {
        const periodEndDate = new Date(period_end)
        const periodEndTime = periodEndDate.getTime()

        return periodEndTime > dawn && periodEndTime < dusk
      }

      try {
        const forecasts = await getWorldRadiationForecasts(apiUrl, latitude, longitude)
        const estimates = await getWorldRadiationEstimatedActuals(apiUrl, latitude, longitude)

        const primaryData = forecasts.forecasts.filter(filterByDay).sort((current, next) => new Date(current.period_end).getTime() - new Date(next.period_end).getTime())
        const secondaryData = estimates.estimated_actuals.filter(filterByDay).sort((current, next) => new Date(current.period_end).getTime() - new Date(next.period_end).getTime())

        const duplicateCheck: {
          [key: string]: boolean
        } = {}

        const combinedData = [...secondaryData, ...primaryData].filter(({ period_end }: { period_end: string }) => {
          const isDuplicate = duplicateCheck[period_end]

          duplicateCheck[period_end] = true

          return !isDuplicate
        })

        setChartData(combinedData)
      } catch (error) {
        console.log(error)
      }
    }

    retrieveData()
    retrieveUserLocation()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!location) {
    return (
      <>
        <ion-text color="danger">Missing Coordinates</ion-text>
      </>
    )
  }

  return (
    <>
      <ion-header translucent>
        <Toolbar name='Forecasts' />
      </ion-header>
      <ion-content fullscreen>
        <ion-card class="ion-padding ion-margin">
          <div className="chart">
            {
              chartData &&
              <DataChart
                labels={chartData.map(({ period_end }) => new Date(period_end))}
                chartData={[
                  {
                    label: "Power per Unit Area (W/m2)",
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
          <ion-card-content>
            <ion-text>Daytime Averages</ion-text>
            <ion-grid>
              <ion-row>
                <ion-label>
                  <h3>GHI: {(chartData.reduce((acc, { ghi }) => acc + ghi, 0) / chartData.length).toFixed(4)} W/m2</h3>
                </ion-label>
              </ion-row>
            </ion-grid>

          </ion-card-content>
        </ion-card>
        <ion-card ref={iframeCard} class="iframeCard ion-margin">
          <iframe
            className="solcast-frame"
            src="https://solcast.com/embed.html?v=phl/2022-05-16/1280x720"
            frameBorder="0"
            allow="autoplay;"
          />

          <ion-card-header>
            <ion-card-subtitle>Solar Irradiance Data</ion-card-subtitle>
          </ion-card-header>
        </ion-card>

        <style jsx>{`
          .chart {
            height: 250px;
          }

          .iframeCard {
            height: 200px;
          }

          .solcast-frame {
            width: 100%;
            height: 225px;
            object-fit: contain;
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