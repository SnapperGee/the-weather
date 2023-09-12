import { fetchCurrentWeatherData, fetchWeatherForecastData as fetchWeatherForecastData, isRecognizedCityName, isRecognizedCountryName } from "../cities";
import { Icon, convertKelvinToFahrenheit, createOpenWeatherMapIconSrc, reformatDateString } from "../util";
import { WeatherDayCard } from "../weather-day-card";
import { WeatherForecastCard } from "../weather-forecast-card";
import { formatSearchQuery, isValidSearchFormat } from "./search-query";
import moment from "moment";

export const searchSubmitEvent = ( submitEvent: SubmitEvent,
                                   htmlInputElement: NonNullable<HTMLInputElement>,
                                   weatherDayCard: WeatherDayCard,
                                   weatherForecastCards: WeatherForecastCard[],
                                   htmlUlElement: NonNullable<HTMLUListElement> ): void =>
{
    submitEvent.preventDefault();

    if (htmlInputElement === undefined || htmlInputElement === null)
    {
        throw new TypeError(`${searchSubmitEvent.name}: ${htmlInputElement} HTML input element.`);
    }

    if (htmlUlElement === undefined || htmlUlElement === null)
    {
        throw new TypeError(`${searchSubmitEvent.name}: ${htmlUlElement} HTML Ul element.`);
    }

    const searchQueryString = htmlInputElement.value;

    if ( ! isValidSearchFormat(searchQueryString))
    {
        // console.log(`Invalid search query string format: "${searchQueryString}". city name, [county] expected.`);
        alert(`Invalid search query string format: "${searchQueryString}". A city name followed by a comma and 2 letter country name expected.`);
        return;
    }

    const formattedSearchQuery =   searchQueryString.includes(",")
                                 ? formatSearchQuery(searchQueryString.split(","))
                                 : formatSearchQuery(searchQueryString);

    if (typeof formattedSearchQuery === "string")
    {
        if ( ! isRecognizedCityName(formattedSearchQuery))
        {
            // console.log(`Unrecognized city name: "${searchQueryString}"`);
            alert(`Unrecognized city name: "${searchQueryString}"`);
            return;
        }
    }
    else
    {
        if ( ! isRecognizedCityName(formattedSearchQuery[0]))
        {
            // console.log(`Unrecognized city name: "${formattedSearchQuery[0]}"`);
            alert(`Unrecognized city name: "${formattedSearchQuery[0]}"`);
            return;
        }

        if ( ! isRecognizedCountryName(formattedSearchQuery[1]))
        {
            // console.log(`Unrecognized country name: "${formattedSearchQuery[1]}"`);
            alert(`Unrecognized country name: "${formattedSearchQuery[1]}"`);
            return;
        }

        fetchCurrentWeatherData(formattedSearchQuery[0], formattedSearchQuery[1])
            .then(currentWeather =>
            {
                const cityName = currentWeather.name;
                const dt_txt = moment().format("MM/DD/YYYY");
                const icon: Icon = {src: createOpenWeatherMapIconSrc(currentWeather.weather[0].icon), alt: `${currentWeather.weather[0].description} icon`};
                const temp = convertKelvinToFahrenheit(currentWeather.main.temp);
                const windSpeed = currentWeather.wind.speed;
                const humidity = currentWeather.main.humidity;

                weatherDayCard.cityName(cityName)
                              .date(dt_txt)
                              .icon(icon)
                              .temp(temp)
                              .windSpeed(windSpeed)
                              .humidity(humidity);
            }
        );

        fetchWeatherForecastData(formattedSearchQuery[0], formattedSearchQuery[1])
            .then(weatherForecast =>
            {
                // console.log(weatherForecast);

                const cityName = weatherForecast.city.name;

                const firstDayForecast = weatherForecast.list[0];

                const secondDayForecast = weatherForecast.list[6];

                const thirdDayForecast = weatherForecast.list[14];

                const fourthDayForecast = weatherForecast.list[30];

                const fifthDayForecast = weatherForecast.list[38];
            }
        );

    }
}
