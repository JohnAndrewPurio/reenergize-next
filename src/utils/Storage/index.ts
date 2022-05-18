import { Storage } from "@capacitor/storage"

/**
 * Get the paired value of the key from storage
 * 
 * @param key Identifier of the value to retrieve/get
 * @returns The stored value paired with the key
 */
export const getValue = async (key: string) => {
    try {
        const { value } = await Storage.get({
            key
        })

        return value && JSON.parse(value)
    } catch (error) {
        throw error
    }
}

/**
 * Stores a value with the key for retrieval later
 * 
 * @param key Identifier of the value to be stored
 * @param value Value to be stored
 */
export const storeValue = async (key: string, value: any) => {
    try {
        await Storage.set({
            key, 
            value: JSON.stringify(value)
        })
    } catch (error) {
        throw error
    }
}

/**
 * Clear all of the values stored
 */
export const clearStorage = async () => {
    try {
        await Storage.clear()
    } catch (error) {
        throw error
    }
}

/**
 * Gets all available keys from the storage
 * 
 * @returns List of keys available
 */
export const getAllKeys = async () => {
    try {
        const keys = await Storage.keys()

        return keys
    } catch (error) {
       throw error 
    }
}