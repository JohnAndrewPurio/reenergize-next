import { ForwardGeocodingData, ReverseGeocodingData } from "./constants"

export const getForwardGeocoding = async (baseUrl: string, location: string) => {
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

export const getReverseGeocoding = async (baseUrl: string, latitude: string, longitude: string) => {
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