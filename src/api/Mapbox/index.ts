import { ForwardGeocodingData, ReverseGeocodingData } from "./constants"
import { apiBaseUrl } from "../constants"

export const getForwardGeocoding = async (location: string, baseUrl: string = apiBaseUrl) => {
    const url = new URL("/mapbox/geocoding/v5/mapbox.places", baseUrl)
    const url_params = new URLSearchParams({
        location
    })

    url.search = url_params.toString()

    try {
        const fetchedData = await fetch(url.toString())
        const jsonData: ForwardGeocodingData = await fetchedData.json()

        return jsonData
    } catch (error) {
        throw error
    }
}

export const getReverseGeocoding = async (latitude: string, longitude: string, baseUrl: string = apiBaseUrl) => {
    const url = new URL("/mapbox/geocoding/v5/mapbox.places", baseUrl)
    const url_params = new URLSearchParams({
        latitude, longitude
    })

    url.search = url_params.toString()

    try {
        const fetchedData = await fetch(url.toString())
        const jsonData: ReverseGeocodingData = await fetchedData.json()

        return jsonData
    } catch (error) {
        throw error
    }
}