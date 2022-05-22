import { useRouter } from "next/router"
import { routes } from "../../../utils/Navigation/routes"
import Toolbar from "../../Toolbar"

const ErrorPage = () => {
    const router = useRouter()

    const returnHome = () => {
        router.push(routes["DEFAULT"])
    }

    return (
        <>
            <ion-header>
                <Toolbar name="Error Page" />
            </ion-header>
            <ion-content>
                <ion-grid>
                    <ion-row class="ion-justify-content-center">
                        <ion-text>Something went wrong</ion-text>
                    </ion-row>
                    <ion-row class="ion-justify-content-center">
                        <ion-button onClick={returnHome}>
                            Go Home
                        </ion-button>
                    </ion-row>
                </ion-grid>
            </ion-content>
        </>
    )
}

export default ErrorPage