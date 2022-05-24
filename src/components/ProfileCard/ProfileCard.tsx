import { logOutOutline, mailOutline, personCircleOutline } from "ionicons/icons"
import { getCurrentUser, signOut } from "../../api/Firebase/authentication"
import { useUserInfo } from "../../context/User"

const ProfileCard = () => {
    const { data: userData, setData: setUserData } = useUserInfo()

    const signOutUser = async () => {
        try {
            await signOut()
            const data = await getCurrentUser()

            setUserData(data)
        } catch (error) {
            console.log(error)
        }
    }

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