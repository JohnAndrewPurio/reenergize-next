import { checkmarkDoneCircleOutline, lockClosedOutline, mailOutline, personCircleOutline } from "ionicons/icons"
import { routes } from "../../../utils/Navigation/routes"

import styles from "../styles.module.css"

const SignUpCard = () => {
    const signUpHandler = async () => {
        
    }

    return (
        <ion-grid class={styles.grid}>
            <ion-row class="ion-justify-content-center">
                <ion-card>
                    <ion-card-header>
                        <ion-card-title class="ion-text-center">Create an Account</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-list>
                            <ion-item>
                                <ion-icon icon={personCircleOutline} slot="start" />
                                <ion-input placeholder="Username" type="text" />
                            </ion-item>
                            <ion-item>
                                <ion-icon icon={mailOutline} slot="start" />
                                <ion-input placeholder="Email" type="email" />
                            </ion-item>
                            <ion-item>
                                <ion-icon icon={lockClosedOutline} slot="start" />
                                <ion-input placeholder="Password" type="password" />
                            </ion-item>
                            <ion-item>
                                <ion-icon icon={checkmarkDoneCircleOutline} slot="start" />
                                <ion-input placeholder="Confirm Password" type="password" />
                            </ion-item>
                            <ion-item lines="none">
                                <ion-grid>
                                    <ion-row class="ion-justify-content-center">
                                        <ion-button size="default">
                                            Sign Up
                                        </ion-button>
                                    </ion-row>
                                    <ion-row class="ion-justify-content-center ion-padding">
                                        <a href={routes["LOGIN"]}>
                                            Already have an account?
                                        </a>
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

export default SignUpCard