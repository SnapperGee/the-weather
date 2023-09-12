export interface DailyWeather
{
    dt: number,
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
    },
    dt_txt: string
}

export interface WeatherAPIResponse
{
    list: readonly DailyWeather[]
}
