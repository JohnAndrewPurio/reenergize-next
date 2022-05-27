import { NativeGeocoder, NativeGeocoderOptions } from "@awesome-cordova-plugins/native-geocoder";
import { Capacitor } from "@capacitor/core";

export const nativeForwardGeocoding = async (address: string, options?: NativeGeocoderOptions) => {
    if(!Capacitor.isNativePlatform()) {
        
    }

    try {
        const result = await NativeGeocoder.forwardGeocode(address, options)

        return result
    } catch (error) {
        throw error
    }
}

export const nativeReverseGeocoding = async (latitude: number, longitude: number, options?: NativeGeocoderOptions) => {
    if(!Capacitor.isNativePlatform()) {

    }

    try {
        const result = await NativeGeocoder.reverseGeocode(latitude, longitude, options)

        console.log("Sample Native Reverse Geocode:", result)

        return result
    } catch (error) {
        throw error
    }
}
