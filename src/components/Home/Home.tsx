import { menuController } from "@ionic/core"
import { menu, searchOutline } from "ionicons/icons"
import { useRouter } from "next/router"
import { FC, useEffect } from "react"
import { getCurrentUser } from "../../api/Firebase/authentication"
import { useSearchModal } from "../../context/Search"
import { useUserInfo } from "../../context/User"
import { getCurrentPosition } from "../../utils/GeoLocation"
import { routes } from "../../utils/Navigation/routes"
import { storeValue } from "../../utils/Storage"

interface HomeInterface {
    menuParameters: {
        menuId: string,
        contentId: string
    }
}

const Home: FC<HomeInterface> = ({ menuParameters }) => {
    const router = useRouter()
    const { data: userData } = useUserInfo()
    const { isOpen, setIsOpen } = useSearchModal()

    const openMenu = async () => {
        await menuController.open(menuParameters.menuId)
    }

    const openModal = () => {
        console.log("Opening Modal...")

        setIsOpen(true)
    }

    const promptUserLocation = async () => {
        console.log("User Location Prompted!!")

        try {
            const location = await getCurrentPosition()

            console.log("Value Stored:", location)

            await storeValue("location", location)
        } catch (error) {
            console.log(error)
        }
    }

    const redirectToProfilePage = () => {
        router.push(routes["PROFILE"])
    }

    return (
        <>
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot='start'>
                        <ion-button onClick={openMenu}>
                            <ion-icon icon={menu} slot='icon-only' />
                        </ion-button>
                    </ion-buttons>

                    <ion-title>ReEnergize</ion-title>

                    <ion-buttons slot='end'>
                        <ion-avatar class="ion-padding" onClick={redirectToProfilePage}>
                            <ion-img src={userData?.photoUrl || ""} alt={userData?.displayName || ""} />
                        </ion-avatar>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <ion-card>
                    <ion-card-header>
                        <ion-card-title>Home Page</ion-card-title>
                    </ion-card-header>
                </ion-card>
            </ion-content>

            <ion-fab vertical="bottom" horizontal="end">
                <ion-fab-button onClick={openModal}>
                    <ion-icon icon={searchOutline} />
                </ion-fab-button>
            </ion-fab>
        </>
    )
}

export default Home