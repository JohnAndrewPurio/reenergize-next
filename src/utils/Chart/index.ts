import Chart, { ChartConfiguration, ChartItem, ChartType, DefaultDataPoint } from "chart.js/auto"
import "chartjs-adapter-luxon"

export const createChart = (elementId: ChartItem, config: ChartConfiguration<ChartType, DefaultDataPoint<ChartType>, unknown>) => {
    const chart = new Chart(elementId, config)

    return chart
}