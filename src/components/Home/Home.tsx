import { menuController, SearchbarChangeEventDetail } from "@ionic/core"
import { menu, searchOutline } from "ionicons/icons"
import { useRouter } from "next/router"
import { FC } from "react"
import { useSearchModal } from "../../context/Search"
import { useUserInfo } from "../../context/User"
import { getForwardGeocoding } from "../../api/Mapbox"
import { routes } from "../../utils/Navigation/routes"

import Content from "./Content"

interface HomeInterface {
    menuParameters: {
        menuId: string,
        contentId: string
    }
    apiUrl: string
}

const Home: FC<HomeInterface> = ({ menuParameters, apiUrl }) => {
    const router = useRouter()
    const { data: userData } = useUserInfo()
    const { isOpen, setIsOpen, setSearchHandler, setData: setSearchResultsData } = useSearchModal()

    const openMenu = async () => {
        await menuController.open(menuParameters.menuId)
    }

    const redirectToProfilePage = () => {
        router.push(routes["PROFILE"])
    }

    const searchHandler = async (event: CustomEvent<SearchbarChangeEventDetail>) => {
        const { value } = event.detail

        if (!value) {
            setSearchResultsData([])

            return
        }

        try {
            // const results = await nativeForwardGeocoding(value)
            const { features } = await getForwardGeocoding(apiUrl, value)

            console.log("Search Results:", features)

            setSearchResultsData(
                features.map((feature) => feature)
            )
        } catch (error) {
            console.log(error)
        }
    }

    const openModal = () => {
        setIsOpen(true)
        setSearchHandler(() => searchHandler)
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