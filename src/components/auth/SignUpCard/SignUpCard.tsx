import { checkmarkDoneCircleOutline, lockClosedOutline, mailOutline, personCircleOutline } from "ionicons/icons"
import Link from "next/link"
import { FormEventHandler } from "react"
import { createUserWithEmailAndPassword } from "../../../api/Firebase/authentication"
import { useUserInfo } from "../../../context/User"
import { routes } from "../../../utils/Navigation/routes"

import styles from "../styles.module.css"

const SignUpCard = () => {
    const { setData: setUserData } = useUserInfo()

    const formHandler: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const { displayName, email, password, confirmPassword } = Object.fromEntries(formData.entries())

        if (password !== confirmPassword) {
            return
        }

        signUpHandler(email as string, password as string)
    }

    const signUpHandler = async (email: string, password: string) => {
        try {
            const user = await createUserWithEmailAndPassword(email, password)

            console.log("Signed in user:", user)

            setUserData(user)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ion-grid class={styles.grid}>
            <ion-row>
                <ion-avatar slot="start" class="ion-padding">
                    <ion-img src="/re-icon.png" alt="ReEnergize" />
                </ion-avatar>
            </ion-row>
            <ion-row class="ion-justify-content-center">
                <ion-card>
                    <ion-card-header>
                        <ion-card-title class="ion-text-center">Create an Account</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-list>
                            <form onSubmit={formHandler}>
                                <ion-item>
                                    <ion-icon icon={personCircleOutline} slot="start" />
                                    <ion-input placeholder="Username" type="text" name="displayName" />
                                </ion-item>
                                <ion-item>
                                    <ion-icon icon={mailOutline} slot="start" />
                                    <ion-input placeholder="Email" type="email" name="email" />
                                </ion-item>
                                <ion-item>
                                    <ion-icon icon={lockClosedOutline} slot="start" />
                                    <ion-input placeholder="Password" type="password" name="password" />
                                </ion-item>
                                <ion-item>
                                    <ion-icon icon={checkmarkDoneCircleOutline} slot="start" />
                                    <ion-input placeholder="Confirm Password" type="password" name="confirmPassword" />
                                </ion-item>
                                <ion-item lines="none">
                                    <ion-grid>
                                        <ion-row class="ion-justify-content-center">
                                            <ion-button size="default" type="submit">
                                                Sign Up
                                            </ion-button>
                                        </ion-row>
                                        <ion-row class="ion-justify-content-center ion-padding">
                                            <Link href={routes["LOGIN"]}>
                                                <a>Already have an account?</a>
                                            </Link>
                                        </ion-row>
                                    </ion-grid>
                                </ion-item>
                            </form>
                        </ion-list>
                    </ion-card-content>
                </ion-card>
            </ion-row>

            <ion-popover>

            </ion-popover>
        </ion-grid>
    )
}

export default SignUpCard