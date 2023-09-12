import { City } from "./cities";

export interface CurrentWeatherAPIResponse
{
  name: string,
  dt: number,
  timezone: number,
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

export interface WeatherForecastAPIResponse
{
    city: City,
    list: readonly DailyWeather[]
}
