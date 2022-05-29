export const apiBaseUrl = "https://reenergize-server.herokuapp.com/"

export const terms = {
    azimuth: {
        name: "Azimuth",
        description: "The angle (degrees) from true north that the PV system is facing, if titled. Must be between -180 and 180. An azimuth of 0 means the system is facing true north. Positive values are anticlockwise, so azimuth is -90 for an east-facing system and 135 for a southwest-facing system. The default value is 0 (north facing) in the southern hemisphere, 180 (south-facing) in the northern hemisphere.",
        more: "https://en.wikipedia.org/wiki/Azimuth"
    },
    capacity: {
        name: "Capacity",
        description: "The capacity of the inverter (AC) or the modules (DC), whichever is greater. Units in kilowatts.",
        more: ""
    },
    dni: {
        name: "Direct Normal Irradiance",
        description: "Direct Normal Irradiance (W/m2) - centre value (mean)",
        more: "https://pvpmc.sandia.gov/modeling-steps/1-weather-design-inputs/irradiance-and-insolation-2/direct-normal-irradiance/"
    },
    ghi: {
        name: "Global Horizontal Irradiance",
        description: "Global Horizontal Irradiance (W/m2) - centre value (mean)",
        more: "https://pvpmc.sandia.gov/modeling-steps/1-weather-design-inputs/irradiance-and-insolation-2/global-horizontal-irradiance/"
    },
    latitude: {
        name: "Latitude",
        description: "The latitude of the location eg, -35.123",
        more: "https://epsg.io/4326"
    },
    longitude: {
        name: "Longitude",
        description: "The longitude of the location eg, 149.123",
        more: "https://epsg.io/4326"
    },
    loss_factor: {
        name: "Loss Factor",
        description: "A factor by which to reduce your output forecast from the full capacity based on characteristics of the PV array or inverter. This is effectively the non-temperature loss effects on the nameplate rating of the PV system, including inefficiency and soiling. For a 1kW PV system anything that reduces 1000W/m2 solar radiation from producing 1000W of power output (assuming temperature is 25C). Valid values are between 0 and 1 (i.e 0.6 equals 60%). If you specify 0.6 your returned power will be a maximum of 60% of AC capacity.",
        more: ""
    },
    tilt: {
        name: "Tilt",
        description: "The angle (degrees) that the PV system is tilted off the horizontal. Must be between 0 and 90. A tilt of 0 means the system is facing directly upwards, and 90 means the system is vertical and facing the horizon. The default value is 23.",
        more: "https://epsg.io/4326"
    }
}