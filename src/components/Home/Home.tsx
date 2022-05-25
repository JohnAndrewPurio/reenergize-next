import { Capacitor } from "@capacitor/core"
import { menuController } from "@ionic/core"
import { menu, searchOutline } from "ionicons/icons"
import { useRouter } from "next/router"
import { FC, useEffect } from "react"
import { getCurrentUser } from "../../api/Firebase/authentication"
import { useSearchModal } from "../../context/Search"
import { useUserInfo } from "../../context/User"
import { getCurrentPosition } from "../../utils/GeoLocation"
import { nativeForwardGeocoding } from "../../utils/GeoLocation/native"
import { routes } from "../../utils/Navigation/routes"
import { storeValue } from "../../utils/Storage"
import Content from "./Content"

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

    const redirectToProfilePage = () => {
        router.push(routes["PROFILE"])
    }

    useEffect(() => {
        if (!Capacitor.isNativePlatform())
            return

        const geocode = async () => {
            try {
                const result = await nativeForwardGeocoding("lucena")

                console.log("Forward Geocode:", result)
            } catch (error) {
                console.log(error)
            }
        }

        geocode()
    }, [])

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
            <ion-content fullscreen>
                <Content />
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