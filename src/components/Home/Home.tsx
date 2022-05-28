import { menuController, SearchbarChangeEventDetail } from "@ionic/core"
import { menu, searchOutline } from "ionicons/icons"
import { useRouter } from "next/router"
import { FC, useEffect } from "react"
import { useSearchModal } from "../../context/Search"
import { useUserInfo } from "../../context/User"
import { getForwardGeocoding } from "../../api/Mapbox"
import { routes } from "../../utils/Navigation/routes"

import SolarMap from "../SolarMap"
import GetCurrentLocation from "./GetCurrentLocation"
import { useUserLocation } from "../../context/Location"
import WeatherCard from "../WeatherCard"
import { WeatherProvider } from "../../context/Weather"

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
    const { data: location } = useUserLocation()
    const {
        setIsOpen, setSearchHandler, setData: setSearchResultsData
    } = useSearchModal()

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
            const { features } = await getForwardGeocoding(value, apiUrl)

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
    }

    useEffect(() => {
        setSearchHandler(() => searchHandler)

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                {
                    !location ? <GetCurrentLocation /> :
                        <WeatherProvider location={location}>
                            <WeatherCard />
                        </WeatherProvider>
                }
                <SolarMap />
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