import { FC } from "react"
import { useWeather } from "../../context/Weather"

const dateFormatOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

const WeatherCard: FC = () => {
    const { data: weather } = useWeather()

    console.log(weather)

    if(!weather) {
        return <></>
    }

    return (
        <ion-card class="ion-margin">
            <ion-card-header>
                <ion-card-title class="ion-text-center">{weather.weather[0].main || ""}</ion-card-title>
                <ion-card-subtitle class="ion-text-center" color="tertiary">{new Date().toLocaleDateString(undefined, dateFormatOptions)}</ion-card-subtitle>
                <ion-card-subtitle class="ion-text-center ion-text-capitalize">{weather.weather[0].description || ""}</ion-card-subtitle>
            </ion-card-header>
            {/* <ion-card-content>
                <ion-grid>
                    <ion-row>
                        <ion-list>
                            <ion-item lines="none">
                                <ion-icon icon={thermometerOutline} slot="start" />
                                <ion-label>
                                    <h5>Temperature:</h5>
                                    <p>{weather.main.temp}</p>
                                </ion-label>
                            </ion-item>
                        </ion-list>
                    </ion-row>
                </ion-grid>
            </ion-card-content> */}
        </ion-card>
    )
}

export default WeatherCard