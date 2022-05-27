import { ToggleChangeEventDetail } from "@ionic/core"
import { logOutOutline, mailOutline, moonOutline, personCircleOutline } from "ionicons/icons"
import { useEffect, useRef } from "react"
import { getCurrentUser, signOut } from "../../api/Firebase/authentication"
import { useTheme } from "../../context/Theme"
import { useUserInfo } from "../../context/User"
import { toggleDarkMode } from "../../utils/Theme"

const ProfileCard = () => {
    const toggleRef = useRef<HTMLIonToggleElement>()
    const { data: userData, setData: setUserData } = useUserInfo()
    const { isDark, setIsDark } = useTheme()

    const signOutUser = async () => {
        try {
            const data = await signOut()

            setUserData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!toggleRef.current)
            return

        toggleRef.current.addEventListener("ionChange", (e) => {
            const event = e as CustomEvent<ToggleChangeEventDetail<any>>
            const isDarkMode = event.detail.checked

            setIsDark(isDarkMode)
        })

        setTimeout(() => {
            if (!toggleRef.current)
                return

            toggleRef.current.checked = isDark
        }, 50)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ion-grid>
            <ion-row class="ion-justify-content-center ion-margin">
                <ion-avatar>
                    <ion-img src={userData?.photoUrl || ""} alt={userData?.displayName || ""} />
                </ion-avatar>
            </ion-row>
            <ion-row class='ion-justify-content-center'>
                <h3>{userData?.displayName}</h3>
            </ion-row>
            <ion-row>
                <ion-col size="12">
                    <ion-list>
                        <ion-item>
                            <ion-icon icon={moonOutline} slot="start" />
                            <ion-label>
                                Dark Mode
                            </ion-label>
                            <ion-toggle ref={toggleRef} slot="end" />
                        </ion-item>
                        <ion-item-group>
                            <ion-list-header>
                                <h4>User Info</h4>
                            </ion-list-header>
                            <ion-item lines="full">
                                <ion-icon icon={mailOutline} slot="start" />
                                <ion-label>
                                    <h5>Email:</h5>
                                    <p>{userData?.email || ""}</p>
                                </ion-label>
                            </ion-item>
                        </ion-item-group>
                    </ion-list>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col size="12">
                    <ion-list lines="full">
                        <ion-list-header>
                            <h4>Account</h4>
                        </ion-list-header>
                        <ion-item button onClick={signOutUser}>
                            <ion-icon icon={logOutOutline} slot="start" />
                            <ion-label>
                                <h4>Log out</h4>
                                <p>{userData?.email || ""}</p>
                            </ion-label>
                        </ion-item>
                    </ion-list>
                </ion-col>
            </ion-row>
        </ion-grid>
    )
}

export default ProfileCard