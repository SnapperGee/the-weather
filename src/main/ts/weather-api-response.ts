import { City } from "./cities";

export interface DailyWeather
{
    dt: number,
    dt_txt: string,
    main: {
      temp: number,
      humidity: number
    },
    weather: [
      {
        icon: string
      }
    ],
    wind: {
      speed: number
    }
}

export interface WeatherAPIResponse
{
    city: City,
    list: readonly DailyWeather[]
}
