import { getTimes } from "suncalc"

export const getSunTimes = (date: Date, latitude: number, longitude: number) => {
    const times = getTimes(date, latitude, longitude)

    return times
}