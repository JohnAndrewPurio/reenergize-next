import { useRouter } from "next/router"
import { FC, MouseEventHandler } from "react"
import { arrowBack } from 'ionicons/icons';

export interface ToolbarProps {
    name: string
    route?: string,
    options?: {
        icon: string,
        handler: MouseEventHandler<Element>
    }[]
}

const Toolbar: FC<ToolbarProps> = ({ name, route, options }) => {
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
            {
                options &&
                <ion-buttons slot="end">
                    {
                        Object.entries(options).map(([key, { handler, icon }]) => (
                            <ion-button key={key} onClick={handler}>
                                <ion-icon icon={icon} slot="icon-only" />
                            </ion-button>
                        ))
                    }
                </ion-buttons>
            }
        </ion-toolbar>
    )
}

export default Toolbar