import { Geolocation } from "@capacitor/geolocation";

export const getCurrentPosition = async () => {
    try {
        const { location, coarseLocation } = await Geolocation.checkPermissions()

        if (location !== 'granted' || coarseLocation !== "granted")
            await Geolocation.requestPermissions()

        const coordinates = await Geolocation.getCurrentPosition()

        return coordinates
    } catch (error) {
        throw error
    }
}