import { CheckboxChangeEventDetail, TextFieldTypes } from "@ionic/core"
import { batteryChargingOutline, checkmarkDoneOutline, searchCircleOutline, swapHorizontalOutline, swapVerticalOutline } from "ionicons/icons"
import { FC, FormEventHandler, useEffect, useRef, useState } from "react"
import { getPvPowerForecasts } from "../../api/Solcast"
import { definition } from "../../api/Solcast/glossary"
import { useUserLocation } from "../../context/Location"
import { showToast } from "../../utils/Toast"
import PVPowerChart from "./PVPowerChart"

interface PVPowerInterface {
    apiUrl: string
}

const locationParameters = [
    {
        icon: swapHorizontalOutline,
        name: "latitude",
        type: "number" as TextFieldTypes,
        symbol: "°",
        min: -90,
        max: 90
    },
    {
        icon: swapVerticalOutline,
        name: "longitude",
        type: "number" as TextFieldTypes,
        symbol: "°",
        min: -180,
        max: 180
    }
]

const PVPower: FC<PVPowerInterface> = ({ apiUrl }) => {
    const latitudeInputRef = useRef<HTMLIonInputElement>()
    const longitudeInputRef = useRef<HTMLIonInputElement>()
    const checkBoxRef = useRef<HTMLIonCheckboxElement>()
    
    const { data: location } = useUserLocation()

    const [usingCurrentLocation, setUsingCurrentLocation] = useState(false)
    const [config, setConfig] = useState<{
        latitude: number,
        longitude: number,
        capacity: number
    }>()

    const inputRefs = {
        latitude: latitudeInputRef,
        longitude: longitudeInputRef
    }

    const formHandler: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()

        console.log(event.target)

        const formData = new FormData(event.target as HTMLFormElement)
        let { latitude, longitude, capacity } = Object.fromEntries(formData.entries())

        setConfig({
            latitude: Number(latitude || location?.latitude || 0),
            longitude: Number(longitude || location?.longitude || 0),
            capacity: Number(capacity)
        })
    }

    const showInfo = async (text: string) => {
        try {
            await showToast({
                text
            })
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        checkBoxRef.current?.addEventListener("ionChange", (e) => {
            const event = e as CustomEvent<CheckboxChangeEventDetail<any>>

            const usingCurrentLocation = event.detail.checked

            setUsingCurrentLocation(usingCurrentLocation)
        })
    }, [])

    return (
        <ion-grid>
            <ion-row class="ion-justify-content-center">
                <PVPowerChart 
                    config={config}
                    apiUrl={apiUrl}
                />
            </ion-row>
            <ion-row>
                <form onSubmit={formHandler}>
                    <ion-list>
                        <ion-item-group class="ion-padding">
                            <ion-list-header>
                                <ion-label>
                                    Site Location
                                </ion-label>
                            </ion-list-header>
                            {
                                locationParameters.map(({ icon, name, type, symbol, min, max }) => (
                                    <ion-item ref={inputRefs[name as keyof typeof inputRefs]} key={name}>
                                        <ion-buttons slot="start">
                                            <ion-button onClick={() => {
                                                // @ts-ignore
                                                showInfo(definition[name])
                                            }}>
                                                <ion-icon icon={icon} slot="icon-only" />
                                            </ion-button>
                                        </ion-buttons>
                                        <ion-input
                                            step="any"
                                            placeholder={name.replace(name[0], name[0].toUpperCase())}
                                            name={name}
                                            required
                                            type={type}
                                            min={min}
                                            max={max}
                                            disabled={usingCurrentLocation}
                                            value={usingCurrentLocation && location ? location[name as keyof typeof location] : undefined}
                                        />
                                        <ion-note slot="end">{symbol}</ion-note>
                                    </ion-item>
                                ))
                            }
                            <ion-item lines="none">
                                <ion-checkbox
                                    ref={checkBoxRef}
                                    slot="start"
                                    disabled={!location}
                                />
                                <ion-label>Use Current Location</ion-label>
                            </ion-item>
                        </ion-item-group>
                        <ion-item-group class="ion-padding">
                            <ion-item>
                                <ion-buttons slot="start">
                                    <ion-button onClick={() => {
                                        // @ts-ignore
                                        showInfo(definition["capacity"])
                                    }}>
                                        <ion-icon icon={batteryChargingOutline} slot="icon-only" />
                                    </ion-button>
                                </ion-buttons>
                                <ion-input
                                    placeholder="Capacity"
                                    name="capacity"
                                    required
                                    type="number"
                                    min={0}
                                />
                                <ion-note slot="end">kW</ion-note>
                            </ion-item>
                        </ion-item-group>
                    </ion-list>
                    <ion-grid>
                        <ion-row class="ion-justify-content-center">
                            <ion-button type="submit">
                                Continue
                            </ion-button>
                        </ion-row>
                    </ion-grid>
                </form>
            </ion-row>
        </ion-grid>

    )
}

export default PVPower