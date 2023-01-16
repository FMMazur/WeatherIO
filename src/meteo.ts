import {
  DailyOptions,
  HourlyOptions,
  MeteoApiResponse,
  SearchResponse,
} from "./meteo_types";

export type DeepRequired<T> = T extends object ? 
  { [K in keyof T]-?: DeepRequired<T[K]> } : T;

export type OmitOrRequired<T extends MeteoApiResponse, K extends keyof T, B> = B extends false | null | undefined
  ? Omit<T, K>
  : Omit<T, K> & DeepRequired<Pick<T, K>>;

export class MeteoApiQuery<T extends MeteoApiResponse = MeteoApiResponse> {
  constructor(
    private _latitude: number = 0,
    private _longitude: number = 0,
    private _daily: DailyOptions[] = [],
    private _hourly: HourlyOptions[] = [],
    private _timezone: string = "auto",
    private _timeformat?: "iso8601" | "unixtime",
    private _current_weather?: boolean,
    private _temperature_unit?: "celsius" | "fahrenheit",
    private _windspeed_unit?: "ms" | "mph" | "kn" | "kmh",
    private _precipitation_unit?: "mm" | "inch",
    private _past_days?: number,
    private _start_date?: string,
    private _end_date?: string
  ) {}

  public latitude(latitude: number) {
    this._latitude = latitude;
    return this;
  }

  public longitude(longitude: number) {
    this._longitude = longitude;
    return this;
  }

  public daily(daily: DailyOptions[]): MeteoApiQuery<OmitOrRequired<T, "daily" | "daily_units", true>>{
    this._daily = daily;
    return this;
  }

  public hourly (hourly: HourlyOptions[]): MeteoApiQuery<OmitOrRequired<T, "hourly" | "hourly_units", true>> {
    this._hourly = hourly;
    return this;
  }

  public timezone(timezone: string) {
    this._timezone = timezone;
    return this;
  }

  public timeformat(timeformat: "iso8601" | "unixtime") {
    this._timeformat = timeformat;
    return this;
  }

  public current_weather(current_weather: boolean): MeteoApiQuery<OmitOrRequired<T, "current_weather", true>> {
    this._current_weather = current_weather;
    return this;
  }

  public temperature_unit(temperature_unit: "celsius" | "fahrenheit") {
    this._temperature_unit = temperature_unit;
    return this;
  }

  public windspeed_unit(windspeed_unit: "ms" | "mph" | "kn" | "kmh") {
    this._windspeed_unit = windspeed_unit;
    return this;
  }

  public precipitation_unit(precipitation_unit: "mm" | "inch") {
    this._precipitation_unit = precipitation_unit;
    return this;
  }

  public past_days(past_days: number) {
    this._past_days = past_days;
    return this;
  }

  public start_date(start_date: string) {
    this._start_date = start_date;
    return this;
  }

  public end_date(end_date: string) {
    this._end_date = end_date;
    return this;
  }

  toString() {
    let result = `latitude=${this._latitude}&longitude=${this._longitude}`;
    if (this._daily.length > 0) {
      result += `&daily=${this._daily.join(",")}`;
    }

    if (this._hourly.length > 0) {
      result += `&hourly=${this._hourly.join(",")}`;
    }

    if (this._timezone) {
      result += `&timezone=${this._timezone}`;
    }

    if (this._timeformat) {
      result += `&timeformat=${this._timeformat}`;
    }

    if (this._current_weather) {
      result += `&current_weather=${this._current_weather}`;
    }

    if (this._temperature_unit) {
      result += `&temperature_unit=${this._temperature_unit}`;
    }

    if (this._windspeed_unit) {
      result += `&windspeed_unit=${this._windspeed_unit}`;
    }

    if (this._precipitation_unit) {
      result += `&precipitation_unit=${this._precipitation_unit}`;
    }

    if (this._past_days) {
      result += `&past_days=${this._past_days}`;
    }

    if (this._start_date) {
      result += `&start_date=${this._start_date}`;
    }

    if (this._end_date) {
      result += `&end_date=${this._end_date}`;
    }

    return result;
  }

  parse() {
    return this.toString();
  }
}

export class MeteoApi {
  private static url = "api.open-meteo.com/v1";

  public static async search(name: string): Promise<SearchResponse> {
    const url = `https://geocoding-${
      MeteoApi.url
    }/search?name=${encodeURIComponent(name)}`;
    const response = await fetch(url);
    return await response.json();
  }

  public static async get<T extends MeteoApiResponse>(
    query: MeteoApiQuery<T>
  ): Promise<T> {
    const url = `https://${MeteoApi.url}/forecast?${query.toString()}`;
    const response = await fetch(url);
    return await response.json();
  }
}
