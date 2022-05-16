import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import React, { useEffect, useMemo, useState } from 'react'
import { getSunTimes } from '../../../utils/Time/suncalc'
import { getWorldRadiationEstimatedActuals, getWorldRadiationForecasts } from '../../api/Solcast'
import { WorldRadiationForecastData } from '../../api/Solcast/constants'
import DataChart from '../../components/DataChart'

interface SummaryProps {
  apiUrl: string
}

const Summary: NextPage<SummaryProps> = ({ apiUrl }) => {
  const [chartData, setChartData] = useState<any[]>(
    // Temporary Data
    [
      {
        "ghi": 0,
        "ebh": 0,
        "dni": 0,
        "dhi": 0,
        "cloud_opacity": 82,
        "period_end": "2022-05-15T21:30:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 19,
        "ebh": 0,
        "dni": 0,
        "dhi": 19,
        "cloud_opacity": 26,
        "period_end": "2022-05-15T22:00:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 75,
        "ebh": 3,
        "dni": 18,
        "dhi": 72,
        "cloud_opacity": 30,
        "period_end": "2022-05-15T22:30:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 148,
        "ebh": 14,
        "dni": 40,
        "dhi": 134,
        "cloud_opacity": 32,
        "period_end": "2022-05-15T23:00:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 164,
        "ebh": 17,
        "dni": 48,
        "dhi": 147,
        "cloud_opacity": 48,
        "period_end": "2022-05-15T23:30:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 140,
        "ebh": 0,
        "dni": 0,
        "dhi": 140,
        "cloud_opacity": 68,
        "period_end": "2022-05-16T00:00:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 98,
        "ebh": 0,
        "dni": 0,
        "dhi": 98,
        "cloud_opacity": 83,
        "period_end": "2022-05-16T00:30:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 122,
        "ebh": 0,
        "dni": 0,
        "dhi": 122,
        "cloud_opacity": 81,
        "period_end": "2022-05-16T01:00:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 147,
        "ebh": 0,
        "dni": 0,
        "dhi": 147,
        "cloud_opacity": 80,
        "period_end": "2022-05-16T01:30:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 373,
        "ebh": 0,
        "dni": 0,
        "dhi": 373,
        "cloud_opacity": 55,
        "period_end": "2022-05-16T02:00:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 751,
        "ebh": 333,
        "dni": 362,
        "dhi": 418,
        "cloud_opacity": 15,
        "period_end": "2022-05-16T02:30:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 774,
        "ebh": 318,
        "dni": 330,
        "dhi": 456,
        "cloud_opacity": 16,
        "period_end": "2022-05-16T03:00:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 811,
        "ebh": 355,
        "dni": 361,
        "dhi": 456,
        "cloud_opacity": 15,
        "period_end": "2022-05-16T03:30:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 871,
        "ebh": 477,
        "dni": 479,
        "dhi": 394,
        "cloud_opacity": 9,
        "period_end": "2022-05-16T04:00:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 780,
        "ebh": 296,
        "dni": 298,
        "dhi": 484,
        "cloud_opacity": 18,
        "period_end": "2022-05-16T04:30:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 790,
        "ebh": 395,
        "dni": 410,
        "dhi": 394,
        "cloud_opacity": 15,
        "period_end": "2022-05-16T05:00:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 841,
        "ebh": 530,
        "dni": 566,
        "dhi": 311,
        "cloud_opacity": 5,
        "period_end": "2022-05-16T05:30:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 714,
        "ebh": 298,
        "dni": 336,
        "dhi": 416,
        "cloud_opacity": 14,
        "period_end": "2022-05-16T06:00:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 542,
        "ebh": 33,
        "dni": 41,
        "dhi": 509,
        "cloud_opacity": 28,
        "period_end": "2022-05-16T06:30:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 590,
        "ebh": 249,
        "dni": 338,
        "dhi": 340,
        "cloud_opacity": 10,
        "period_end": "2022-05-16T07:00:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 484,
        "ebh": 157,
        "dni": 239,
        "dhi": 327,
        "cloud_opacity": 13,
        "period_end": "2022-05-16T07:30:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 352,
        "ebh": 52,
        "dni": 92,
        "dhi": 299,
        "cloud_opacity": 22,
        "period_end": "2022-05-16T08:00:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 214,
        "ebh": 0,
        "dni": 0,
        "dhi": 214,
        "cloud_opacity": 36,
        "period_end": "2022-05-16T08:30:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 122,
        "ebh": 0,
        "dni": 0,
        "dhi": 122,
        "cloud_opacity": 47,
        "period_end": "2022-05-16T09:00:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 22,
        "ebh": 0,
        "dni": 0,
        "dhi": 22,
        "cloud_opacity": 81,
        "period_end": "2022-05-16T09:30:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 8,
        "ebh": 0,
        "dni": 0,
        "dhi": 8,
        "cloud_opacity": 70,
        "period_end": "2022-05-16T10:00:00.0000000Z",
        "period": "PT30M"
      },
      {
        "ghi": 1,
        "ebh": 0,
        "dni": 0,
        "dhi": 1,
        "cloud_opacity": 76,
        "period_end": "2022-05-16T10:30:00.0000000Z",
        "period": "PT30M"
      }
    ]
  )

  const retrieveData = async () => {
    const currentDate = new Date()

    const latitude = 13.93139
    const longitude = 121.61722
    const times = getSunTimes(currentDate, latitude, longitude)

    const filterByDay: any = ({ period_end }: any) => {
      const periodEndTime = new Date(period_end).getTime()

      return periodEndTime > times.dawn.getTime() && periodEndTime < times.dusk.getTime()
    }

    try {
      const forecasts = await getWorldRadiationForecasts(apiUrl, latitude, longitude)
      const estimates = await getWorldRadiationEstimatedActuals(apiUrl, latitude, longitude)

      const primaryData = forecasts.forecasts.filter(filterByDay).sort((current, next) => new Date(current.period_end).getTime() - new Date(next.period_end).getTime())
      const secondaryData = estimates.estimated_actuals.filter(filterByDay).sort((current, next) => new Date(current.period_end).getTime() - new Date(next.period_end).getTime())

      const duplicateCheck: {
        [key: string]: boolean
      } = {}

      const combinedData = [...primaryData, ...secondaryData].filter(({ period_end }: { period_end: string }) => {
        const isDuplicate = duplicateCheck[period_end]

        duplicateCheck[period_end] = true

        return !isDuplicate
      })

      setChartData(combinedData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // retrieveData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ion-card>
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
        <ion-card-title>Lucena, Quezon</ion-card-title>
      </ion-card>
    </>
  )
}

export const getStaticProps: GetStaticProps<SummaryProps> = async () => {
  return {
    props: {
      apiUrl: process.env.API_BASE_URL || "https://reenergize-server.herokuapp.com/"
    }
  }
}

export default Summary