import { Capacitor } from "@capacitor/core"
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem"

export const writeToFile = async (data: string, filePath: string) => {
    if(!Capacitor.isNativePlatform())
        return

    const path = "/ReEnergize" + filePath

    try {
        await Filesystem.writeFile({
            path, 
            data,
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
            recursive: true
        })
    } catch (error) {
        throw error
    }
}