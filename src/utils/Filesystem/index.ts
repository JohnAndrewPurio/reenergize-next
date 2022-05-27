import { Capacitor } from "@capacitor/core"
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem"
import { FileOpener } from "@whiteguru/capacitor-plugin-file-opener"

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

export const openFile = async (path: string) => {
    try {
        await FileOpener.open({
            path
        })
    } catch (error) {
        throw error
    }
}

export const getFileUri = async (path: string) => {
    try {
        const uri = await Filesystem.getUri({
            path,
            directory: Directory.Documents
        })

        return uri
    } catch (error) {
        throw error
    }   
}