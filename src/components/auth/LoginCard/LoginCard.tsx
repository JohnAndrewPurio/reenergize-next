import { lockClosedOutline, logoGoogle, mailOutline } from "ionicons/icons"
import Link from "next/link"
import { FormEventHandler } from "react"
import { signInWithEmailAndPassword, signInWithGoogle } from "../../../api/Firebase/authentication"
import { useUserInfo } from "../../../context/User"
import { routes } from "../../../utils/Navigation/routes"

import styles from "../styles.module.css"

const LoginCard = () => {
    const { setData: setUserData } = useUserInfo()

    const formHandler: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const { email, password } = Object.fromEntries(formData.entries())

        emailSignIn(email as string, password as string)
    }

    const emailSignIn = async (email: string, password: string) => {
        try {
            const user = await signInWithEmailAndPassword(email, password)
        } catch (error) {
            console.log(error)
        }
    }

    const googleSignIn = async () => {
        try {
            const user = await signInWithGoogle()

            console.log("User:", user)
            setUserData(user)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ion-grid class={styles.grid}>
            <ion-row class="ion-justify-content-center">
                <ion-card>
                    <ion-card-header>
                        <ion-card-title class="ion-text-center">ReEnergize</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-list>
                            <form onSubmit={formHandler}>
                                <ion-item>
                                    <ion-icon icon={mailOutline} slot="start" />
                                    <ion-input placeholder="Email" type="email" name="email" required />
                                </ion-item>
                                <ion-item>
                                    <ion-icon icon={lockClosedOutline} slot="start" />
                                    <ion-input placeholder="Password" type="password" name="password" required />
                                </ion-item>
                                <ion-item lines="none">
                                    <ion-grid>
                                        <ion-row class="ion-justify-content-center">
                                            <ion-button size="default" type="submit">
                                                Continue
                                            </ion-button>
                                        </ion-row>
                                        <ion-row class="ion-justify-content-center ion-padding">
                                            <Link href={routes["SIGNUP"]}>
                                                <a>{"Don't have an account?"}</a>
                                            </Link>
                                        </ion-row>
                                    </ion-grid>
                                </ion-item>
                            </form>
                            <ion-item>
                                <ion-grid class="ion-margin">
                                    <ion-row class="ion-justify-content-center">
                                        <ion-button size="default" color="secondary" onClick={googleSignIn}>
                                            <ion-icon icon={logoGoogle} slot="start" />
                                            Sign In with Google
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