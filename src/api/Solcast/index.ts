import { apiBaseUrl } from "../constants"
import type { PVPowerEstimatesData, PVPowerForecastData, WorldRadiationEstimatesData, WorldRadiationForecastData } from "./constants"

export type ResponseFormat = "csv" | "json" | "xml"

export const getWorldRadiationForecasts = async (latitude: number, longitude: number, hours?: number, format: ResponseFormat = "json", baseUrl = apiBaseUrl) => {
    const url = new URL("/solcast/world_radiation/forecasts", baseUrl)
    const url_params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        format
    })

    if (hours)
        url_params.append("hours", String(hours))

    url.search = url_params.toString()

    try {
        const fetchedData = await fetch(url.toString())
        const jsonData: WorldRadiationForecastData = await fetchedData.json()

        if (fetchedData.status >= 400) {
            // @ts-ignore
            throw new Error(jsonData.message)
        }

        return jsonData
    } catch (error) {
        throw error
    }
}

export const getWorldRadiationEstimatedActuals = async (latitude: number, longitude: number, hours?: number, format: ResponseFormat = "json", baseUrl = apiBaseUrl) => {
    const url = new URL("/solcast/world_radiation/estimated_actuals", baseUrl)
    const url_params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        format
    })

    if (hours)
        url_params.append("hours", String(hours))

    url.search = url_params.toString()

    try {
        const fetchedData = await fetch(url.toString())
        const jsonData: WorldRadiationEstimatesData = await fetchedData.json()

        if (fetchedData.status >= 400) {
            // @ts-ignore
            throw new Error(jsonData.message)
        }
        
        return jsonData
    } catch (error) {
        throw error
    }
}

export interface PVPowerOptions {
    tilt?: number
    azimuth?: number
    install_date?: string
    loss_factor?: number
    hours?: number
}

export const getPvPowerForecasts = async (latitude: number, longitude: number, capacity: number, options?: PVPowerOptions, baseUrl = apiBaseUrl) => {
    const url = new URL("/solcast/world_pv_power/forecasts", baseUrl)
    const url_params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        capacity: String(capacity)
    })

    if (options) {
        for (let key in options) {
            if (!options[key as keyof PVPowerOptions])
                continue

            url_params.append(key, String(options[key as keyof PVPowerOptions]))
        }
    }

    url.search = url_params.toString()

    try {
        const fetchedData = await fetch(url.toString())
        const jsonData: PVPowerForecastData = await fetchedData.json()

        return jsonData
    } catch (error) {
        throw error
    }
}

export const getPvPowerEstimatedActuals = async (latitude: number, longitude: number, capacity: number, options?: PVPowerOptions, baseUrl = apiBaseUrl) => {
    const url = new URL("/solcast/world_pv_power/estimated_actuals", baseUrl)
    const url_params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        capacity: String(capacity)
    })

    if (options) {
        for (let key in options) {
            if (!options[key as keyof PVPowerOptions])
                continue

            url_params.append(key, String(options[key as keyof PVPowerOptions]))
        }
    }

    url.search = url_params.toString()

    try {
        const fetchedData = await fetch(url.toString())
        const jsonData: PVPowerEstimatesData = await fetchedData.json()

        return jsonData
    } catch (error) {
        throw error
    }
}