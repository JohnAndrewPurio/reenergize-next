import { popoverController, SearchbarChangeEventDetail } from "@ionic/core"
import { FC, useEffect, useRef, useState } from "react"
import { getForwardGeocoding, getReverseGeocoding } from "../../../api/Mapbox"
import { getCurrentPosition } from "../../../utils/GeoLocation"

import styles from "./../styles.module.css"
import SearchResultsList from "./SearchResultsList"

interface UserLocationSlideInterface {
  baseUrl: string
}

const UserLocationSlide: FC<UserLocationSlideInterface> = ({ baseUrl }) => {
  const searchRef = useRef<HTMLIonSearchbarElement>()
  const [searchList, setSearchList] = useState<ItemProps[]>([])

  const getDeviceLocation = async () => {
    const location = await getCurrentPosition()
    const { coords } = location
    const geocode = await getReverseGeocoding(baseUrl, coords.longitude.toFixed(4), coords.latitude.toFixed(4))

    console.log(geocode)
  }

  useEffect(() => {
    const getUserLocationSuggestions = async (location: string) => {
      try {
        const geocode = await getForwardGeocoding(baseUrl, location)
        const list = geocode.features.map(({ place_name, id }) => ({
          id,
          name: place_name,
          handler: () => {
            console.log("Search Text:", place_name)
          }
        }))

        setSearchList(list)
      } catch (error) {
        console.log(error)
      }
    }

    searchRef.current?.addEventListener("ionChange", (evt) => {
      const event = evt as CustomEvent<SearchbarChangeEventDetail>
      const location = event.detail.value

      if (!location)
        return

      getUserLocationSuggestions(location)
    })
  }, [baseUrl])

  return (
    <ion-grid class={styles.grid}>
      <ion-row>
        <ion-title>What is your home location?</ion-title>
      </ion-row>
      <ion-row class="ion-justify-content-center">
        <ion-searchbar
          id="search"
          animated
          debounce={300}
          ref={searchRef}
          placeholder="Search Location"
        />
      </ion-row>
      <ion-row class="ion-justify-content-center">
        <ion-button onClick={getDeviceLocation}>
          Get Location
        </ion-button>
      </ion-row>

      <ion-popover
        backdrop-dismiss={false}
        trigger="search"
        trigger-action="context-menu"
        is-open={searchList.length > 0}
        side="bottom"
        alignment="center"
        dismiss-on-select
        show-backdrop={false}
      >
        <SearchResultsList items={searchList} />
      </ion-popover>
    </ion-grid>
  )
}

export default UserLocationSlide