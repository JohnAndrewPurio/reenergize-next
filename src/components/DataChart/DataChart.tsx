import { FC, useEffect } from "react"
import { progressiveAnimation } from "../../utils/Chart/animations"
import { createChart } from "../../utils/Chart"
import { BubbleDataPoint, ChartDataset, ChartTypeRegistry, ScatterDataPoint } from "chart.js"

interface DataChartProps {
  id: string
  labels: any[]
  chartData: ChartDataset<keyof ChartTypeRegistry, (number | ScatterDataPoint | BubbleDataPoint | null)[]>[]
}

const DataChart: FC<DataChartProps> = ({ id, labels, chartData }) => {
  useEffect(() => {
    const totalDuration = 2000;
    const delayBetweenPoints = totalDuration / labels.length;

    const chart = createChart(id, {
      type: 'line',
      data: {
        labels,
        datasets: chartData
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        layout: {
          padding: {
            top: 8,
            left: 4,
            right: 8,
            bottom: 8
          }
        },
        elements: {
          point: {
            radius: 0
          }
        },
        animation: progressiveAnimation(totalDuration, delayBetweenPoints),
        scales: {
          x: {
            grid: {
              display: false
            },
            type: "time",
            title: {
              display: true,
              text: "Time"
            },
            ticks: {
              callback: (value, index) => index % 6 === 0 ? String(value) : ""
            }
          },
          y: {
            grid: {
              display: false
            },
            beginAtZero: true,
            ticks: {
              stepSize: 200
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: "Solar Forecast Data Chart"
          }
        }
      }
    })

    return () => {
      chart.destroy()
    }
  })

  return (
    <canvas id={id} aria-label="Solar Forecast Data Chart" role="img">
      <p>Unable to fetch Solar Forecast Data</p>
    </canvas>
  )
}

export default DataChart