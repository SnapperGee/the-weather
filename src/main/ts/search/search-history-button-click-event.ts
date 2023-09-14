import { fetchCurrentWeatherData, fetchWeatherForecastData } from "../cities";
import { type Icon, createOpenWeatherMapIconSrc, convertKelvinToFahrenheit, formatDateString } from "../util";
import { formatSearchQuery } from "./search-query";
import { CurrentWeatherCard } from "../current-weather-card";
import { WeatherForecastCard } from "../weather-forecast-card";
import dom from "../dom";
import dayjs from "dayjs";

/**
 * The function that fires when a city search history button is clicked. It updates the current weather and 5 day
 * forecast cards with the OpenWeatherMap API response data and makes them visible.
 *
 * @param mouseEvent The mouse event that triggered this function.
 *
 * @param searchFormElement The city search `HTMLFormElement`.
 *
 * @param currentWeatherCard The card to update with the current weather API response data.
 *
 * @param weatherForecastRow The row containing the weather forecast cards to hide and show.
 *
 * @param weatherForecastCards The card to update with the day weather forecast API response data.
 */
export const searchHistoryButtonClickEvent = ( mouseEvent: MouseEvent,
                                               searchFormElement: HTMLFormElement,
                                               currentWeatherCard: CurrentWeatherCard,
                                               weatherForecastRow: HTMLDivElement,
                                               weatherForecastCards: WeatherForecastCard[] ) =>
{
    if (mouseEvent.target instanceof HTMLButtonElement)
    {
        // Get the form HTMLInputElement
        const formHTMLInput = searchFormElement.querySelector("input");

        // Set the form value to the button's test content
        formHTMLInput!.value = mouseEvent.target.textContent!;

        // Separate the city and country names into different array values
        const formattedSearchQuery = formatSearchQuery(mouseEvent.target.textContent!.split(", "));

        // Make call to OpenWeatherMap current weather API with the provided city and country names
        fetchCurrentWeatherData(formattedSearchQuery[0], formattedSearchQuery[1])
            .then(currentWeather =>
            {
                // Get current time
                const now = dayjs().utc().tz(dayjs.tz.guess());

                // Current date to display in header
                const currentDayString = now.format("MM/DD/YYYY");

                // Get all the needed data to update the current weather card with
                const cityName = currentWeather.name;
                const dt_txt = currentDayString;
                const icon: Icon = {src: createOpenWeatherMapIconSrc(currentWeather.weather[0].icon), alt: `${currentWeather.weather[0].description} icon`};
                const temp = convertKelvinToFahrenheit(currentWeather.main.temp);
                const windSpeed = currentWeather.wind.speed;
                const humidity = currentWeather.main.humidity;

                // Hide the current weather card while updating its values
                currentWeatherCard.hide();

                // Update the current weather card with the OpenWeatherMap API response data
                currentWeatherCard.cityName(cityName)
                                  .date(dt_txt)
                                  .icon(icon)
                                  .temp(temp)
                                  .windSpeed(windSpeed)
                                  .humidity(humidity);

                currentWeatherCard.show();
            }
        );

        // Hide weather forecast row while setting it's data
        weatherForecastRow.classList.add("d-none");

        // Make call to OpenWeatherMap 5 day weather forecast API with the provided city and country names
        fetchWeatherForecastData(formattedSearchQuery[0], formattedSearchQuery[1])
            .then(weatherForecast =>
            {
                // Get the forecast data for the mid-day weather of each day
                const weatherForecastDays = Object.freeze([
                    weatherForecast.list[5],
                    weatherForecast.list[13],
                    weatherForecast.list[21],
                    weatherForecast.list[29],
                    weatherForecast.list[37]
                ]);

                // Loop through retrieved weather 5 day forecast data
                for (const index in weatherForecastDays)
                {
                    // The current forecast day weather data
                    const weatherForecastData = weatherForecastDays[index];

                    // Get all the needed data to update the weather forecast card with
                    const dt_txt = formatDateString(weatherForecastData.dt_txt);
                    const icon: Icon = {src: createOpenWeatherMapIconSrc(weatherForecastData.weather[0].icon), alt: `${weatherForecastData.weather[0].description} icon`};
                    const temp = convertKelvinToFahrenheit(weatherForecastData.main.temp);
                    const windSpeed = weatherForecastData.wind.speed;
                    const humidity = weatherForecastData.main.humidity;

                    const weatherForecastCard = weatherForecastCards[index];

                    // Update the weather forecast card with the OpenWeatherMap API response data
                    weatherForecastCard.date(dt_txt)
                                       .icon(icon)
                                       .temp(temp)
                                       .windSpeed(windSpeed)
                                       .humidity(humidity);
                }

            }
        );

        // Show weather forecast row with updated values
        weatherForecastRow.classList.remove("d-none");
    }

    // Remove bootstrap classes for initial page layout if this is the first city search query.
    dom.rootRow().classList.remove("justify-content-center");
    dom.weatherInfoColumn().classList.remove("d-none");
};

export default searchHistoryButtonClickEvent;
