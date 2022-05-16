import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import React, { useEffect, useMemo, useState } from 'react'
import { getWorldRadiationEstimatedActuals, getWorldRadiationForecasts } from '../../api/Solcast'
import { WorldRadiationForecastData } from '../../api/Solcast/constants'
import DataChart from '../../components/DataChart'

interface SummaryProps {
  apiUrl: string
}

const Summary: NextPage<SummaryProps> = ({ apiUrl }) => {
  const [chartData, setChartData] = useState<any[]>()

  const retrieveData = async () => {
    const currentDate = new Date()

    const latitude = 13.93139
    const longitude = 121.61722
    const filterByDay: any = ({ period_end }: any) => {
      const periodEndData = new Date(period_end)

      return currentDate.getMonth() === periodEndData.getMonth() && currentDate.getDate() === periodEndData.getDate()
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
    retrieveData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(chartData)

  return (
    <>
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