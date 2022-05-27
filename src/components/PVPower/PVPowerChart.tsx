import { FC, useEffect, useState } from "react"
import { getPvPowerEstimatedActuals, getPvPowerForecasts, PVPowerOptions } from "../../api/Solcast"
import { nativeReverseGeocoding } from "../../utils/GeoLocation/native"
import { getSunTimes } from "../../utils/Time/suncalc"
import DataChart from "../DataChart"

interface PVPowerChartProps extends PVPowerOptions {
    config?: {
        latitude: number,
        longitude: number,
        capacity: number
    }
    apiUrl: string
}

const dateFormatOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

const PVPowerChart: FC<PVPowerChartProps> = ({ config, apiUrl }) => {
    const [chartData, setChartData] = useState<any[]>([])
    const [forecastData, setForecastData] = useState<any[]>([])
    const [targetDate, setTargetDate] = useState(new Date())
    const [address, setAddress] = useState("")
    const [loading, setLoading] = useState(false)

    const showCurrentData = (targetData: Date, latitude: number, longitude: number) => {
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
        console.log("Config:", config)

        if (!config)
            return

        const { latitude, longitude, capacity } = config

        setLoading(true)

        const getAddress = async () => {
            try {
                const data = await nativeReverseGeocoding(latitude, longitude)

                let address = ""

                if (data && data[0]) {
                    const [place] = data
                    const { administrativeArea, countryName, subAdministrativeArea, locality } = place

                    address = `${locality}, ${subAdministrativeArea}, ${administrativeArea}, ${countryName}`
                }

                setAddress(address)
            } catch (error) {
                throw error
            }
        }

        const retrieveData = async () => {
            const options = {
                hours: 72
            }

            try {
                const forecastData = await getPvPowerForecasts(latitude, longitude, capacity, options, apiUrl)
                const estimatedActuals = await getPvPowerEstimatedActuals(latitude, longitude, capacity, options, apiUrl)

                console.log(forecastData, estimatedActuals)

                if (!forecastData.forecasts || !estimatedActuals.estimated_actuals)
                    return

                setForecastData([
                    ...forecastData.forecasts,
                    ...estimatedActuals.estimated_actuals
                ])
            } catch (error) {
                throw error
            }
        }

        const initializeData = async () => {
            try {
                await retrieveData()
                await getAddress()
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        initializeData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config])

    useEffect(() => {
        if (!config) {
            return
        }

        const { latitude, longitude } = config

        showCurrentData(targetDate, latitude, longitude)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forecastData, config, targetDate])

    if (!config) {
        return (
            <></>
        )
    }

    if (loading) {
        return (
            <ion-grid class="ion-margin">
                <ion-row class="ion-justify-content-center ion-padding">
                    <ion-spinner />
                </ion-row>
            </ion-grid>
        )
    }

    console.log(chartData)

    return (
        <>
            {
                config &&
                <ion-card class="ion-padding ion-margin">
                    <div className="chart">
                        <DataChart
                            labels={chartData.map(({ period_end }) => new Date(period_end))}
                            chartData={[
                                {
                                    label: "Power Output (W)",
                                    borderColor: "#9ACD32",
                                    data: chartData.map(({ pv_estimate }) => pv_estimate * config.capacity * 1000),
                                    borderJoinStyle: "round",
                                    fill: "start"
                                }
                            ]}
                        />
                    </div>
                    <ion-card-header>
                        <ion-card-title class="ion-text-center">{targetDate.toLocaleDateString(undefined, dateFormatOptions)}</ion-card-title>
                        <ion-card-subtitle class="ion-text-center">{address}</ion-card-subtitle>
                    </ion-card-header>
                </ion-card>
            }

            <style jsx>{`
                .chart {
                  height: 250px;
                }
            `}</style>
        </>
    )
}

export default PVPowerChart