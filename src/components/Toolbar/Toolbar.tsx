import { useRouter } from "next/router"
import { FC } from "react"
import { arrowBack } from 'ionicons/icons';

export interface ToolbarProps {
    name: string
    route?: string
}

const Toolbar: FC<ToolbarProps> = ({ name, route }) => {
    const { push, back } = useRouter()

    const goToRoute = () => {
        if (route) {
            push(route)

            return
        }

        back()
    }

    return (
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button onClick={goToRoute}>
                    <ion-icon icon={arrowBack} slot="icon-only" />
                </ion-button>
            </ion-buttons>
            <ion-title class="ion-text-capitalize">{name}</ion-title>
        </ion-toolbar>
    )
}

export default Toolbar