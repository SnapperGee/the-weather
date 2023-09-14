/**
 * @module weather-forecast-api-response
 */

import { City } from "./cities";

/**
 * Interface for the minimal amount of information needed from the current weather API call.
 */
export interface CurrentWeatherAPIResponse
{
  name: string,
  dt: number,
  timezone: number,
  sys: {
    country: string
  }
  main: {
    temp: number,
    humidity: number
  },
  weather: [
    {
      icon: string,
      description: string
    }
  ],
  wind: {
    speed: number
  }
}

/**
 * Interface for the minimal amount of information needed nested within the weather forecast API call.
 */
export interface DailyWeather
{
    dt_txt: string,
    main: {
      temp: number,
      humidity: number
    },
    weather: [
      {
        icon: string,
        description: string
      }
    ],
    wind: {
      speed: number
    }
}

/**
 * Interface for the minimal amount of information needed from the weather forecast API call.
 */
export interface WeatherForecastAPIResponse
{
    city: City,
    list: readonly DailyWeather[]
}
