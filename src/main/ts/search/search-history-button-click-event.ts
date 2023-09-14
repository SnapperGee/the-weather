import { fetchCurrentWeatherData, fetchWeatherForecastData } from "../cities";
import { type Icon, createOpenWeatherMapIconSrc, convertKelvinToFahrenheit, formatDateString } from "../util";
import { formatSearchQuery } from "./search-query";
import { CurrentWeatherCard } from "../current-weather-card";
import { WeatherForecastCard } from "../weather-forecast-card";
import dom from "../dom";
import dayjs from "dayjs";

export const searchHistoryButtonClickEvent = ( mouseEvent: MouseEvent,
                                               searchFormElement: HTMLFormElement,
                                               currentWeatherCard: CurrentWeatherCard,
                                               weatherForecastRow: HTMLDivElement,
                                               weatherForecastCards: WeatherForecastCard[] ) =>
{
    if (mouseEvent.target instanceof HTMLButtonElement)
    {
        const textInput = searchFormElement.querySelector("input");
        textInput!.value = mouseEvent.target.textContent!;

        const formattedSearchQuery = formatSearchQuery(mouseEvent.target.textContent!.split(", "));

        fetchCurrentWeatherData(formattedSearchQuery[0], formattedSearchQuery[1])
            .then(currentWeather =>
            {
                // Get current time
                const now = dayjs().utc().tz(dayjs.tz.guess());

                // Current date to display in header
                const currentDayString = now.format("MM/DD/YYYY");

                const cityName = currentWeather.name;
                const dt_txt = currentDayString;
                const icon: Icon = {src: createOpenWeatherMapIconSrc(currentWeather.weather[0].icon), alt: `${currentWeather.weather[0].description} icon`};
                const temp = convertKelvinToFahrenheit(currentWeather.main.temp);
                const windSpeed = currentWeather.wind.speed;
                const humidity = currentWeather.main.humidity;

                currentWeatherCard.hide();

                currentWeatherCard.cityName(cityName)
                                  .date(dt_txt)
                                  .icon(icon)
                                  .temp(temp)
                                  .windSpeed(windSpeed)
                                  .humidity(humidity);

                currentWeatherCard.show();
            }
        );

        weatherForecastRow.classList.add("d-none");

        fetchWeatherForecastData(formattedSearchQuery[0], formattedSearchQuery[1])
            .then(weatherForecast =>
            {
                const weatherForecastDays = Object.freeze([
                    weatherForecast.list[5],
                    weatherForecast.list[13],
                    weatherForecast.list[21],
                    weatherForecast.list[29],
                    weatherForecast.list[37]
                ]);

                for (const index in weatherForecastDays)
                {
                    const weatherForecastData = weatherForecastDays[index];

                    const dt_txt = formatDateString(weatherForecastData.dt_txt);
                    const icon: Icon = {src: createOpenWeatherMapIconSrc(weatherForecastData.weather[0].icon), alt: `${weatherForecastData.weather[0].description} icon`};
                    const temp = convertKelvinToFahrenheit(weatherForecastData.main.temp);
                    const windSpeed = weatherForecastData.wind.speed;
                    const humidity = weatherForecastData.main.humidity;

                    const weatherForecastCard = weatherForecastCards[index];

                    weatherForecastCard.date(dt_txt);
                    weatherForecastCard.icon(icon);
                    weatherForecastCard.temp(temp);
                    weatherForecastCard.windSpeed(windSpeed);
                    weatherForecastCard.humidity(humidity);
                }

            }
        );

        weatherForecastRow.classList.remove("d-none");
    }

    dom.rootRow().classList.remove("justify-content-center");
    dom.weatherInfoColumn().classList.remove("d-none");
};

export default searchHistoryButtonClickEvent;
