import { SearchbarChangeEventDetail } from "@ionic/core"
import { FC, useEffect, useRef, useState } from "react"
import { getForwardGeocoding, getReverseGeocoding } from "../../../api/Mapbox"
import { getCurrentPosition } from "../../../utils/GeoLocation"
import { storeValue } from "../../../utils/Storage"

import styles from "./../styles.module.css"

interface UserLocationPromptInterface {
  baseUrl: string
}

const UserLocationPrompt: FC<UserLocationPromptInterface> = ({ baseUrl }) => {
  const searchRef = useRef<HTMLIonSearchbarElement>()

  const getDeviceLocation = async () => {
    const location = await getCurrentPosition()
    const { coords } = location
    const geocode = await getReverseGeocoding(baseUrl, coords.longitude.toFixed(4), coords.latitude.toFixed(4))

    await storeValue("location", {
      ...location, geocode
    })
  }

  

  useEffect(() => {
    const getUserLocationSuggestions = async (location: string) => {
      const geocode = await getForwardGeocoding(baseUrl, location)
  
      console.log("Location Suggestions:", geocode)
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
    </ion-grid>
  )
}

export default UserLocationPrompt