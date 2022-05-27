import { compassOutline, locationOutline, mapOutline, navigateCircleOutline } from "ionicons/icons"
import { useUserLocation } from "../../context/Location"
import { getCurrentPosition } from "../../utils/GeoLocation"

import styles from "./styles.module.css"

const GetCurrentLocation = () => {
  const { data: locationData, setData: setLocationData } = useUserLocation()

  const promptUserLocation = async () => {
    try {
      const { coords } = await getCurrentPosition()
      const { latitude, longitude } = coords

      const data = locationData || {}

      setLocationData({
        ...data,
        latitude,
        longitude
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ion-grid class={styles.grid}>
      <ion-row class="ion-justify-content-center ion-padding">
        <ion-icon class={styles.mapIcon} icon={compassOutline} color="tertiary" />
      </ion-row>
      <ion-row class="ion-justify-content-center">
        <ion-button onClick={promptUserLocation} color="secondary">
          <ion-icon icon={locationOutline} slot="start" />
          Get Current Location
        </ion-button>
      </ion-row>
    </ion-grid>
  )
}

export default GetCurrentLocation