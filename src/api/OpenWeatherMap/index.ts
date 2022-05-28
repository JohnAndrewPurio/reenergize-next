import { apiBaseUrl } from "../constants"

import type { WeatherData } from "./constants"

interface OptionalParameters {
    mode?: "json" | "xml" | "html"
    units?: "standard" | "metric" | "imperial"
}

export const getCurrentWeather = async (lat: number, lon: number, options?: OptionalParameters) => {
    const url = new URL("/openweathermap/data/2.5/weather", apiBaseUrl)
    const url_search_params = new URLSearchParams({
        lat: String(lat),
        lon: String(lon)
    })

    if(options) {
        for(let k in options) {
            const key = k as keyof typeof options 

            if(!options[key])
                continue

            url_search_params.append(key, options[key] as string)
        }
    }

    url.search = url_search_params.toString()

    try {
        const fetchedData = await fetch(url.toString())
        const jsonData = await fetchedData.json()

        if(fetchedData.status >= 400)
            throw new Error(jsonData.message)

        return jsonData as WeatherData
    } catch (error) {
        throw error
    }
}