import { NativeGeocoder, NativeGeocoderOptions } from "@awesome-cordova-plugins/native-geocoder";

export const nativeForwardGeocoding = async (address: string, options?: NativeGeocoderOptions) => {
    try {
        const result = await NativeGeocoder.forwardGeocode(address, options)

        return result
    } catch (error) {
        throw error
    }
}

export const nativeReverseGeocoding = async (latitude: number, longitude: number, options?: NativeGeocoderOptions) => {
    try {
        const result = await NativeGeocoder.reverseGeocode(latitude, longitude, options)

        return result
    } catch (error) {
        throw error
    }
}
