import { thermometerOutline } from "ionicons/icons"
import { FC } from "react"
import { weatherIconUrl } from "../../api/OpenWeatherMap/constants"
import { useUserLocation } from "../../context/Location"
import { useWeather } from "../../context/Weather"

const dateFormatOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

const WeatherCard: FC = () => {
    const { data: weather } = useWeather()
    const { data: location } = useUserLocation()

    if (!weather || !location) {
        return <></>
    }

    return (
        <ion-card class="ion-margin">
            <ion-card-header>
                <ion-list>
                    <ion-item lines="none">
                        <ion-label>
                            <ion-card-title class="ion-text-center" >{location.address}</ion-card-title>
                            <ion-card-subtitle class="ion-text-center" color="tertiary">
                                {new Date().toLocaleDateString(undefined, dateFormatOptions)}
                            </ion-card-subtitle>
                        </ion-label>
                    </ion-item>
                    <ion-item lines="none">
                        <ion-label>
                            <ion-card-title class="ion-text-center">{weather.weather[0].main || ""}</ion-card-title>
                            <ion-card-subtitle class="ion-text-center ion-text-capitalize">
                                {weather.weather[0].description || ""}
                            </ion-card-subtitle>
                        </ion-label>
                        <ion-avatar slot="end">
                            <ion-img src={`${weatherIconUrl}/${weather.weather[0].icon}.png`} alt={weather.weather[0].description || ""} />
                        </ion-avatar>
                    </ion-item>
                    <ion-item lines="none">
                        <ion-icon icon={thermometerOutline} slot="start" />
                        <ion-label>
                            <h4>Temperature</h4>
                        </ion-label>
                        <ion-note slot="end">{weather.main.temp} °C</ion-note>
                    </ion-item>
                </ion-list>



            </ion-card-header>
            <ion-card-content>

            </ion-card-content>
        </ion-card>
    )
}

export default WeatherCard