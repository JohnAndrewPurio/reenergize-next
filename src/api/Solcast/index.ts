import type { WorldRadiationEstimatesData, WorldRadiationForecastData } from "./constants"

export type ResponseFormat = "csv" | "json" | "xml"

export const getWorldRadiationForecasts = async (baseUrl: string, latitude: number, longitude: number, hours?: number, format: ResponseFormat = "json") => {
    const url = new URL("/solcast/world_radiation/forecasts", baseUrl)
    const url_params = new URLSearchParams({
        latitude: String(latitude), 
        longitude: String(longitude),
        format
    })

    if(hours)
        url_params.append("hours", String(hours))

    url.search = url_params.toString()

    try {
        const fetchedData = await fetch(url.toString())
        const jsonData: WorldRadiationForecastData = await fetchedData.json()

        return jsonData
    } catch (error) {
        throw error
    }
}

export const getWorldRadiationEstimatedActuals = async (baseUrl: string, latitude: number, longitude: number, hours?: number, format: ResponseFormat = "json") => {
    const url = new URL("/solcast/world_radiation/estimated_actuals", baseUrl)
    const url_params = new URLSearchParams({
        latitude: String(latitude), 
        longitude: String(longitude),
        format
    })

    if(hours)
        url_params.append("hours", String(hours))

    url.search = url_params.toString()

    try {
        const fetchedData = await fetch(url.toString())
        const jsonData: WorldRadiationEstimatesData = await fetchedData.json()

        return jsonData
    } catch (error) {
        throw error
    }
}