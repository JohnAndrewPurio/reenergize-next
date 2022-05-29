import { FC, useEffect, useMemo } from "react"
import Swiper, { Navigation } from "swiper"

import { WorldRadiationData } from "../../api/Solcast/constants"
import { UserLocationInterface } from "../../context/Location"

import DataChart from "../DataChart"

import "swiper/css"
import 'swiper/css/navigation'
import { glossary, units } from "../../api/Solcast/glossary"
import { roundAccurately } from "../../utils/Numbers"

interface ChartSlidesProps {
    location: UserLocationInterface
    slidesData: {
        [key: string]: {
            data: WorldRadiationData[],
            summary: WorldRadiationData
        }
    }
}

const dateFormatOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

const ChartSlides: FC<ChartSlidesProps> = ({ slidesData, location }) => {
    const slidesEntries = Object.entries(slidesData)

    useEffect(() => {
        setTimeout(() => {
            const swiper = new Swiper(".swiper", {
                modules: [Navigation],
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                }
            })
        }, 0)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="swiper">
            <div className="swiper-wrapper">
                {
                    slidesEntries.map(([key, { data, summary }]) => (
                        <div key={key} className="swiper-slide">
                            <ion-card class="ion-padding ion-margin">
                                <div className="chart-wrapper">
                                    <DataChart
                                        id={new Date(key).toISOString()}
                                        labels={data.map(({ period_end }) => new Date(period_end))}
                                        chartData={[
                                            {
                                                label: "GHI (W/m2)",
                                                data: data.map(({ ghi }) => ghi),
                                                backgroundColor: [
                                                    'rgba(255, 99, 132, 0.2)'
                                                ],
                                                borderColor: [
                                                    'rgba(255, 99, 132, 1)'
                                                ]
                                            }
                                        ]}
                                    />
                                </div>
                                <ion-card-header>
                                    <ion-card-title class="ion-text-center">{new Date(key).toLocaleDateString(undefined, dateFormatOptions)}</ion-card-title>
                                    <ion-card-subtitle class="ion-text-center">{location.address}</ion-card-subtitle>
                                </ion-card-header>
                            </ion-card>

                            <ion-card class="ion-padding ion-margin">
                                <ion-card-content>
                                    {
                                        Object.entries(summary).map(([key, value]) => (
                                            <ion-item key={key}>
                                                <ion-label>
                                                    <h5>{glossary[key as keyof typeof glossary]}:</h5>
                                                    <p>{roundAccurately(value / data.length, 4)}</p>
                                                </ion-label>
                                                <ion-note slot="end">{units[key as keyof typeof units]}</ion-note>
                                            </ion-item>
                                        ))
                                    }
                                </ion-card-content>
                            </ion-card>
                        </div>
                    ))
                }
            </div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
            <div className="swiper-pagination" />

            <style jsx>{`
                .swiper {
                  width: 100%;
                  height: 100%;
                  overflow-y: auto;
                }

                .chart-wrapper {
                    height: 250px;
                }

                .swiper-button-prev, .swiper-button-next {
                    --swiper-theme-color: var(--ion-color-primary) !important;
                }
            `}</style>
        </div>
    )
}

export default ChartSlides