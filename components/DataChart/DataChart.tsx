import Chart from "chart.js/auto"
import { useEffect } from "react"
import { progressiveAnimation } from "../../utils/Chart/animations"
import { sampleForecastData } from "../../api/Solcast/constants"
import "chartjs-adapter-luxon"

const DataChart = () => {
  useEffect(() => {
    const labels = sampleForecastData.forecasts.map(({ period_end }) => period_end)
    
    const data = sampleForecastData.forecasts.map(({ ghi }) => ghi)

    const totalDuration = 2000;
    const delayBetweenPoints = totalDuration / data.length;

    console.log(labels)

    const chart = new Chart("canvas", {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: "Energy Output",
          borderColor: "green",
          data,
          borderJoinStyle: "round"
        }]
      },
      options: {
        animation: progressiveAnimation(totalDuration, delayBetweenPoints),
        responsive: true,
        scales: {
          x: {
            type: "time",
            time: {
              tooltipFormat: "DD T"
            },
            title: {
              display: true,
              text: "Time"
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 
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
    <canvas id="canvas" aria-label="Solar Forecast Data Chart" role="img">
      <p>Unable to fetch Solar Forecast Data</p>
    </canvas>
  )
}

export default DataChart