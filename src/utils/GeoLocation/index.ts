import { Geolocation, Position } from "@capacitor/geolocation";
import { Capacitor } from "@capacitor/core";

const dummyData: Position = {
    "coords": {
        "latitude": 13.9403251,
        "longitude": 121.5891842,
        "accuracy": 28.100000381469727,
        "altitude": 90.30000305175781,
        "altitudeAccuracy": 3.5385470390319824,
        "speed": 0,
        "heading": 0
    },
    "timestamp": 1652862417005
}

export const getCurrentPosition = async () => {
    if(!Capacitor.isNativePlatform())
        return dummyData

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