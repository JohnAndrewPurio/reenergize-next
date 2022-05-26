import { TextFieldTypes } from "@ionic/core"
import { batteryChargingOutline, checkmarkDoneOutline, searchCircleOutline, swapHorizontalOutline, swapVerticalOutline } from "ionicons/icons"
import { FormEventHandler, useEffect, useRef } from "react"
import { definition } from "../../api/Solcast/glossary"
import { showToast } from "../../utils/Toast"

const PVPower = () => {
    const checkBoxRef = useRef<HTMLIonCheckboxElement>()

    const locationParameters = [
        {
            icon: swapHorizontalOutline,
            name: "latitude",
            type: "number" as TextFieldTypes,
            symbol: "°",
            min: -180,
            max: 180
        },
        {
            icon: swapVerticalOutline,
            name: "longitude",
            type: "number" as TextFieldTypes,
            symbol: "°",
            min: -90,
            max: 90
        }
    ]

    const formhandler: FormEventHandler<HTMLFormElement> = (event) => {
        const formData = new FormData(event.target as HTMLFormElement)
        const entries = Object.fromEntries(formData.entries())
        
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

    }, [])

    return (
        <ion-grid>
            <form onSubmit={formhandler}>
                <ion-list>
                    <ion-item-group class="ion-padding">
                        <ion-list-header>
                            <ion-label>
                                Site Location
                            </ion-label>
                        </ion-list-header>
                        {
                            locationParameters.map(({ icon, name, type, symbol, min, max }) => (
                                <ion-item key={name}>
                                    <ion-buttons slot="start">
                                        <ion-button onClick={() => {
                                            // @ts-ignore
                                            showInfo(definition[name])
                                        }}>
                                            <ion-icon icon={icon} slot="icon-only" />
                                        </ion-button>
                                    </ion-buttons>
                                    <ion-input
                                        placeholder={name.replace(name[0], name[0].toUpperCase())}
                                        name={name}
                                        required
                                        type={type}
                                        min={min}
                                        max={max}
                                    />
                                    <ion-note slot="end">{symbol}</ion-note>
                                </ion-item>
                            ))
                        }
                        <ion-item lines="none">
                            <ion-checkbox slot="start" />
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
        </ion-grid>

    )
}

export default PVPower