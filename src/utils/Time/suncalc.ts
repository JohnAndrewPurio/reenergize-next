import Suncalc from "suncalc"

export const getSunTimes = (date: Date, latitude: number, longitude: number) => {
    const times = Suncalc.getTimes(date, latitude, longitude)

    return times
}