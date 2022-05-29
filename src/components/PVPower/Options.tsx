import { TextFieldTypes } from "@ionic/core"
import { useEffect, useRef } from "react"
import { glossary, placeHolders, units } from "../../api/Solcast/glossary"

const options = {
    tilt: {
        name: "tilt",
        type: "number",
        step: 0.001,
        min: 0,
        max: 90
    },
    azimuth: {
        name: "azimuth",
        type: "number",
        step: 0.001,
        min: 0,
        max: 180
    },
    install_date: {
        name: "install_date",
        type: "date",
    },
    loss_factor: {
        name: "loss_factor",
        type: "number",
        step: 1,
        max: 100,
        min: 0
    }
}

const Options = () => {
    return (
        <ion-accordion-group>
            <ion-accordion value="options">
                <ion-item slot="header">
                    <ion-label>Optional Configurations</ion-label>
                </ion-item>

                <ion-list slot="content">
                    {
                        // @ts-ignore
                        Object.entries(options).map(([key, { name, type, step, min, max }]) => (
                            <ion-item key={key}>
                                <ion-label class="ion-text-capitalize">{key.replace(/_/g, " ")}:</ion-label>
                                <ion-input
                                    name={name}
                                    type={type as TextFieldTypes}
                                    step={step}
                                    min={min}
                                    max={max}
                                    placeholder={placeHolders[key as keyof typeof placeHolders]}
                                />
                                {
                                    !!units[key as keyof typeof units] &&
                                    <ion-note slot="end">
                                        {
                                            units[key as keyof typeof units]
                                        }
                                    </ion-note>
                                }

                            </ion-item>
                        ))
                    }
                </ion-list>
            </ion-accordion>
        </ion-accordion-group>
    )
}

export default Options