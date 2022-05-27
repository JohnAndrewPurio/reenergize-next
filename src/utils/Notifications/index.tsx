import { LocalNotifications, LocalNotificationSchema } from "@capacitor/local-notifications";
import { Capacitor } from "@capacitor/core";
import { openFile } from "../Filesystem";


export const showNotification = async (notifications: LocalNotificationSchema[]) => {
    if (!Capacitor.isNativePlatform())
        return

    LocalNotifications.schedule({
        notifications
    })
}