import { useRouter } from "next/router"
import { routes } from "../../../utils/Navigation/routes"

import styles from "./../styles.module.css"

const ContinueSlide = () => {
    const router = useRouter()

    const goToHome = () => {
        router.push(routes["DEFAULT"])
    }

    return (
        <ion-grid class={styles.grid} >
            <ion-row class="ion-justify-content-center">
                <ion-button onClick={goToHome}>
                    Continue
                </ion-button>
            </ion-row>
        </ion-grid>
    )
}

export default ContinueSlide