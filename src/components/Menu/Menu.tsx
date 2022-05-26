import { menuController } from "@ionic/core"
import { useRouter } from "next/router"
import { FC } from "react"
import { camelCaseToNormalCase } from "../../utils/Text"
import { menuContent } from "./content"

export interface MenuInterface {
    menuId: string
    contentId: string
}

const Menu: FC<MenuInterface> = ({ menuId, contentId, children }) => {
    const router = useRouter()
    const closeMenu = async () => {
        await menuController.close(menuId)
    }

    const redirectHandler = async (href: string) => {
        router.push(href)

        await closeMenu()
    }

    return (
        <>
            <ion-menu side="start" menu-id={menuId} content-id={contentId} swipeGesture>
                <ion-header translucent>
                    <ion-toolbar>
                        <ion-avatar slot="start">
                            <ion-img src="/re-icon.png" alt="ReEnergize" />
                        </ion-avatar>
                        <ion-title>ReEnergize</ion-title>
                    </ion-toolbar>
                </ion-header>
                <ion-content>
                    <ion-list>
                        {
                            Object.entries(menuContent).map(([key, value]) => (
                                <ion-item key={key} button onClick={() => redirectHandler(value.href)} lines="none">
                                    <ion-icon icon={value.icon} slot="start" />
                                    <ion-label>{camelCaseToNormalCase(key)}</ion-label>
                                </ion-item>
                            ))
                        }
                    </ion-list>
                </ion-content>
            </ion-menu>

            <ion-router-outlet id={contentId}>
                {children}
            </ion-router-outlet>
        </>
    )
}

export default Menu