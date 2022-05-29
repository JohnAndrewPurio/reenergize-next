import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";
import { getCurrentWeather } from "../../api/OpenWeatherMap";
import { WeatherData } from "../../api/OpenWeatherMap/constants";
import { getValue, storeValue } from "../../utils/Storage";
import { UserLocationInterface } from "../Location";

interface ContextInterface {
    data?: WeatherData,
    setData: Dispatch<SetStateAction<WeatherData | undefined>>
}

interface WeatherProviderProps {
    location: UserLocationInterface
}

const WeatherContext = createContext<ContextInterface>({
    setData: () => { }
})

export const useWeather = () => useContext(WeatherContext)

export const WeatherProvider: FC<WeatherProviderProps> = ({ children, location }) => {
    const [data, setData] = useState<WeatherData>()
    const [loading, setLoading] = useState(false)
    const [firstLoad, setFirstLoad] = useState(true)

    const fetchWeatherData = async (latitude: number, longitude: number) => {
        try {
            const data = await getCurrentWeather(latitude, longitude, {
                units: "metric"
            })

            setData(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const retrieveCachedData = async () => {
        const { latitude, longitude } = location

        try {
            const today = await getValue("today")
            const data = await getValue("weather")

            if (!data && today !== new Date().toDateString()) {
                await fetchWeatherData(latitude, longitude)

                return
            }

            setData(data)
        } catch (error) {
            console.log(error)
        } finally {
            setFirstLoad(false)
        }
    }

    useEffect(() => {
        retrieveCachedData()

        storeValue("today", new Date().toDateString())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (firstLoad)
            return

        const { latitude, longitude } = location

        setLoading(true)
        fetchWeatherData(latitude, longitude)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    useEffect(() => {
        if (!data)
            return


        storeValue("weather", data)
    }, [data])

    return (
        <WeatherContext.Provider value={{
            data, setData
        }}>
            {
                loading ? <Loading /> :
                    <>
                        {children}
                    </>
            }
        </WeatherContext.Provider>
    )
}

const Loading = () => {
    return (
        <ion-grid class="ion-margin">
            <ion-row class="ion-justify-content-center ion-margin">
                <ion-spinner />
            </ion-row>
        </ion-grid>
    )
}