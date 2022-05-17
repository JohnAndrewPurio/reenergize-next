import { App } from "@capacitor/app"
import { alertController } from "@ionic/core"

const exitAlert = {
    header: "Exit app?",
    buttons: [
        'No',
        {
            text: 'Yes',
            handler: App.exitApp
        }
    ]
}

export const appExit = async () => {
    const alert = await alertController.create(exitAlert)

    await alert.present()
}