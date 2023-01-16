export type HourlyOptions =
  | "temperature_2m"
  | "relativehumidity_2m"
  | "dewpoint_2m"
  | "apparent_temperature"
  | "precipitation"
  | "rain"
  | "showers"
  | "snowfall"
  | "snow_depth"
  | "freezinglevel_height"
  | "weathercode"
  | "pressure_msl"
  | "surface_pressure"
  | "cloudcover"
  | "cloudcover_low"
  | "cloudcover_mid"
  | "cloudcover_high"
  | "visibility"
  | "evapotranspiration"
  | "et0_fao_evapotranspiration"
  | "vapor_pressure_deficit"
  | "cape"
  | "windspeed_10m"
  | "windspeed_80m"
  | "windspeed_120m"
  | "windspeed_180m"
  | "winddirection_10m"
  | "winddirection_80m"
  | "winddirection_120m"
  | "winddirection_180m"
  | "windgusts_10m"
  | "temperature_80m"
  | "temperature_120m"
  | "temperature_180m"
  | "soil_temperature_0cm"
  | "soil_temperature_6cm"
  | "soil_temperature_18cm"
  | "soil_temperature_54cm"
  | "soil_moisture_0_1cm"
  | "soil_moisture_1_3cm"
  | "soil_moisture_3_9cm"
  | "soil_moisture_9_27cm"
  | "soil_moisture_27_81cm";
export type DailyOptions =
  | "weathercode"
  | "temperature_2m_max"
  | "temperature_2m_min"
  | "apparent_temperature_max"
  | "apparent_temperature_min"
  | "sunrise"
  | "sunset"
  | "precipitation_sum"
  | "rain_sum"
  | "showers_sum"
  | "snowfall_sum"
  | "precipitation_hours"
  | "windspeed_10m_max"
  | "windgusts_10m_max"
  | "winddirection_10m_dominant"
  | "shortwave_radiation_sum"
  | "et0_fao_evapotranspiration";

export interface MeteoApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather?: CurrentWeather;
  hourly_units?: HourlyUnits;
  hourly?: Hourly;
  daily_units?: DailyUnits;
  daily?: Daily;
}

export interface CurrentWeather {
  temperature?: number;
  windspeed?: number;
  winddirection?: number;
  weathercode?: WeatherCode;
  time?: string;
}

export interface DailyUnits {
  time?: string;
  weathercode?: string;
  temperature_2m_max?: string;
  temperature_2m_min?: string;
  apparent_temperature_max?: string;
  apparent_temperature_min?: string;
  sunrise?: string;
  sunset?: string;
  precipitation_sum?: string;
  rain_sum?: string;
  showers_sum?: string;
  snowfall_sum?: string;
  precipitation_hours?: string;
  windspeed_10m_max?: string;
  windgusts_10m_max?: string;
  winddirection_10m_dominant?: string;
  shortwave_radiation_sum?: string;
  et0_fao_evapotranspiration?: string;
}

export interface HourlyUnits {
  time?: string;
  temperature_2m?: string;
  relativehumidity_2m?: string;
  dewpoint_2m?: string;
  apparent_temperature?: string;
  precipitation?: string;
  rain?: string;
  showers?: string;
  snowfall?: string;
  snow_depth?: string;
  freezinglevel_height?: string;
  weathercode?: string;
  pressure_msl?: string;
  surface_pressure?: string;
  cloudcover?: string;
  cloudcover_low?: string;
  cloudcover_mid?: string;
  cloudcover_high?: string;
  visibility?: string;
  evapotranspiration?: string;
  et0_fao_evapotranspiration?: string;
  vapor_pressure_deficit?: string;
  cape?: string;
  windspeed_10m?: string;
  windspeed_80m?: string;
  windspeed_120m?: string;
  windspeed_180m?: string;
  winddirection_10m?: string;
  winddirection_80m?: string;
  winddirection_120m?: string;
  winddirection_180m?: string;
  windgusts_10m?: string;
  temperature_80m?: string;
  temperature_120m?: string;
  temperature_180m?: string;
  soil_temperature_0cm?: string;
  soil_temperature_6cm?: string;
  soil_temperature_18cm?: string;
  soil_temperature_54cm?: string;
  soil_moisture_0_1cm?: string;
  soil_moisture_1_3cm?: string;
  soil_moisture_3_9cm?: string;
  soil_moisture_9_27cm?: string;
  soil_moisture_27_81cm?: string;
}

export interface Daily {
  time?: string[];
  weathercode?: WeatherCode[];
  temperature_2m_max?: number[];
  temperature_2m_min?: number[];
  apparent_temperature_max?: number[];
  apparent_temperature_min?: number[];
  sunrise?: number[];
  sunset?: number[];
  precipitation_sum?: number[];
  rain_sum?: number[];
  showers_sum?: number[];
  snowfall_sum?: number[];
  precipitation_hours?: number[];
  windspeed_10m_max?: number[];
  windgusts_10m_max?: number[];
  winddirection_10m_dominant?: number[];
  shortwave_radiation_sum?: number[];
  et0_fao_evapotranspiration?: number[];
}

export interface Hourly {
  time?: number[];
  temperature_2m?: number[];
  relativehumidity_2m?: number[];
  dewpoint_2m?: number[];
  apparent_temperature?: number[];
  precipitation?: number[];
  rain?: number[];
  showers?: number[];
  snowfall?: number[];
  snow_depth?: number[];
  freezinglevel_height?: number[];
  weathercode?: WeatherCode[];
  pressure_msl?: number[];
  surface_pressure?: number[];
  cloudcover?: number[];
  cloudcover_low?: number[];
  cloudcover_mid?: number[];
  cloudcover_high?: number[];
  visibility?: number[];
  evapotranspiration?: number[];
  et0_fao_evapotranspiration?: number[];
  vapor_pressure_deficit?: number[];
  cape?: number[];
  windspeed_10m?: number[];
  windspeed_80m?: number[];
  windspeed_120m?: number[];
  windspeed_180m?: number[];
  winddirection_10m?: number[];
  winddirection_80m?: number[];
  winddirection_120m?: number[];
  winddirection_180m?: number[];
  windgusts_10m?: number[];
  temperature_80m?: number[];
  temperature_120m?: number[];
  temperature_180m?: number[];
  soil_temperature_0cm?: number[];
  soil_temperature_6cm?: number[];
  soil_temperature_18cm?: number[];
  soil_temperature_54cm?: number[];
  soil_moisture_0_1cm?: number[];
  soil_moisture_1_3cm?: number[];
  soil_moisture_3_9cm?: number[];
  soil_moisture_9_27cm?: number[];
  soil_moisture_27_81cm?: number[];
}

export interface SearchResponse {
  generationtime_ms: number;
  results: SearchResult[];
}

export interface SearchResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  population: number;
  timezone: string;

  country: string;
  country_code: string;
  country_id: number;
  admin1?: string;
  admin1_id?: number;
  admin2?: string;
  admin2_id?: number;
  admin3?: string;
  admin3_id?: number;
  admin4?: string;
  admin4_id?: number;
  elevation: number;
  feature_code: string;
}

export const WEATHERCODE = {
  Clear: 0,
  MainlyClear: 1,
  PartlyCloudy: 2,
  Overcast: 3,
  Fog: 45,
  RimeFog: 48,
  DrizzleLight: 51,
  DrizzleModerate: 53,
  DrizzleDense: 55,
  FreezingDrizzleLight: 56,
  FreezingDrizzleDensity: 57,
  RainSlight: 61,
  RainModerate: 63,
  RainHeavy: 65,
  FreezingRainLight: 66,
  FreezingRainHeavy: 67,
  SnowfallSlight: 71,
  SnowfallModerate: 73,
  SnowfallHeavy: 75,
  SnowGrains: 77,
  RainShowersLight: 80,
  RainShowersModerate: 81,
  RainShowersHeavy: 82,
  SnowShowersLight: 85,
  SnowShowersHeavy: 86,
  Thunderstorm: 95,
  ThunderstormHailSligh: 96,
  ThunderstormHailHeavy: 99,
} as const;

export type WeatherCode = typeof WEATHERCODE[keyof typeof WEATHERCODE];
