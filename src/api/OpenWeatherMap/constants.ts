export const weatherIconUrl = "http://openweathermap.org/img/w"

const sampleWeatherData = {
    "coord": {
        "lon": 122,
        "lat": 13
    },
    "weather": [
        {
            "id": 501,
            "main": "Rain",
            "description": "moderate rain",
            "icon": "10n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 28.19,
        "feels_like": 32.09,
        "temp_min": 28.19,
        "temp_max": 28.19,
        "pressure": 1007,
        "humidity": 77,
        "sea_level": 1007,
        "grnd_level": 1007
    },
    "visibility": 7317,
    "wind": {
        "speed": 8.7,
        "deg": 192,
        "gust": 8.84
    },
    "rain": {
        "1h": 3.87
    },
    "clouds": {
        "all": 95
    },
    "dt": 1653681996,
    "sys": {
        "country": "PH",
        "sunrise": 1653686697,
        "sunset": 1653732830
    },
    "timezone": 28800,
    "id": 1694008,
    "name": "Philippines",
    "cod": 200
}

export type WeatherData = typeof sampleWeatherData