export const worldRadiationForecasts = {
	ghi: "Global Horizontal Irradiance",
	dni: "Direct Normal Irradiance",
	dhi: "Diffuse Horizontal Irradiance",
	air_temp: "Air temperature",
	zenith: "Solar Zenith Angle",
	azimuth: "Solar Azimuth Angle",
	cloud_opacity: "Cloud Opacity",
	period_end: "Period End",
	period: "Period"
}

export interface WorldRadiationData { 
	ghi: number
	ebh: number
	dni: number
	dhi: number
	cloud_opacity: number
	period_end: string | Date
	period: string
}

export interface WorldRadiationForecastData {
	forecasts: WorldRadiationData[]
}


export interface WorldRadiationEstimatesData {
	estimated_actuals: WorldRadiationData[]
}

export interface PVPowerData { 
	pv_estimate: number,
	period_end: string | Date
	period: string
}

export interface PVPowerEstimatesData {
	estimated_actuals: PVPowerData[]
}

export interface PVPowerForecastData {
	forecasts: PVPowerData[]
}