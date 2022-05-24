import { lockClosedOutline, logoGoogle, mailOutline } from "ionicons/icons"
// import { signInWithGoogle } from "../../api/Firebase/authentication"
import styles from "./styles.module.css"

const LoginCard = () => {
    return (
        <ion-grid class={styles.grid}>
            <ion-row class="ion-justify-content-center">
                <ion-card>
                    <ion-card-header>
                        <ion-card-title class="ion-text-center">ReEnergize Login</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-list>
                            <ion-item>
                                <ion-icon icon={mailOutline} slot="start" />
                                <ion-input placeholder="Email" type="email" />
                            </ion-item>
                            <ion-item>
                                <ion-icon icon={lockClosedOutline} slot="start" />
                                <ion-input placeholder="Password" type="password" />
                            </ion-item>
                            <ion-item lines="none">
                                <ion-grid>
                                    <ion-row class="ion-justify-content-center">
                                        <ion-button size="default">
                                            Continue
                                        </ion-button>
                                    </ion-row>
                                </ion-grid>
                            </ion-item>
                            <ion-item>
                                <ion-grid>
                                    <ion-row class="ion-justify-content-center">
                                        <ion-button size="default" color="secondary" onClick={() => {}}>
                                            <ion-icon icon={logoGoogle} slot="start" />
                                            <ion-label>Sign In with Google</ion-label>
                                        </ion-button>
                                    </ion-row>
                                </ion-grid>
                            </ion-item>
                        </ion-list>
                    </ion-card-content>
                </ion-card>
            </ion-row>
        </ion-grid>
    )
}

export default LoginCard