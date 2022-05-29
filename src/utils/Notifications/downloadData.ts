import { ActionPerformed, LocalNotifications } from "@capacitor/local-notifications"
import { showNotification } from "."
import { getWorldRadiationForecasts } from "../../api/Solcast"
import { UserLocationInterface } from "../../context/Location"
import { writeToFile, getFileUri, openFile } from "../Filesystem"
import { showToast } from "../Toast"

export const downloadData = async (location: UserLocationInterface, apiUrl?: string) => {
    const { latitude, longitude } = location
    const format = "csv"
    const fileName = `${new Date().toDateString()}.${format}`
    const path = `/forecasts/${fileName}`

    try {
        const data = await getWorldRadiationForecasts(latitude, longitude, 72, format, apiUrl) as any

        await writeToFile(data, path)

        const { uri } = await getFileUri(path)

        showNotification([
            {
                id: 1,
                title: "File downloaded",
                body: "Documents/ReEnergize" + path,
                smallIcon: "small.png",
                largeIcon: "large.png"
            }
        ])

        const tapHandler = async (event: ActionPerformed) => {
            if (event.actionId !== "tap")
                return

            try {
                await openFile(uri)
            } catch (error) {
                console.log(error)
            } finally {
                LocalNotifications.removeAllListeners()
            }
        }

        LocalNotifications.addListener("localNotificationActionPerformed", tapHandler)
    } catch (e) {
        const { message } = e as Error

        console.log(message)
        showToast({
            text: message,
            duration: "long"
        })
    }
}