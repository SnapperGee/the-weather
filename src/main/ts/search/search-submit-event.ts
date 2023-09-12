import { fetchCurrentWeatherData, fetchWeatherForecastData as fetchWeatherForecastData, isRecognizedCityName, isRecognizedCountryName } from "../cities";
import { Icon, convertKelvinToFahrenheit, createOpenWeatherMapIconSrc, formatDateString } from "../util";
import { WeatherDayCard } from "../weather-day-card";
import { WeatherForecastCard } from "../weather-forecast-card";
import { formatSearchQuery, isValidSearchFormat } from "./search-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import createSearchHistoryLIButton from "./create-search-history-li-button";

dayjs.extend(utc);
dayjs.extend(tz);

export const searchSubmitEvent = ( submitEvent: SubmitEvent,
                                   htmlInputElement: NonNullable<HTMLInputElement>,
                                   weatherDayCard: WeatherDayCard,
                                   weatherForecastHeader: HTMLElement,
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

        const searchHistoryString: string | null = localStorage.getItem("searchHistory");

        const searchHistoryArray: string[] = searchHistoryString !== null ? JSON.parse(searchHistoryString) : [];

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

                weatherDayCard.hide();

                weatherDayCard.cityName(cityName)
                              .date(dt_txt)
                              .icon(icon)
                              .temp(temp)
                              .windSpeed(windSpeed)
                              .humidity(humidity);

                weatherDayCard.show();

                const prettySearchString = formattedSearchQuery.join(", ");

                const preExistingSearchHistoryIndex = searchHistoryArray.findIndex(preExistingSearchHistoryString => prettySearchString.localeCompare(preExistingSearchHistoryString, undefined, {sensitivity: "base"}) === 0);

                if (preExistingSearchHistoryIndex !== -1)
                {
                    searchHistoryArray.splice(preExistingSearchHistoryIndex, 1);
                }
                else if (searchHistoryArray.length >= 20)
                {
                    searchHistoryArray.pop();
                }

                searchHistoryArray.unshift(prettySearchString);

                localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArray));

                const searchHistoryListItems = htmlUlElement.querySelectorAll("li");

                Array.from(searchHistoryListItems).forEach(searchHistoryListItem =>{
                    const searchHistoryButton = searchHistoryListItem.querySelector("button");
                    if (searchHistoryButton?.textContent?.localeCompare(prettySearchString, undefined, {sensitivity: "base"}) === 0)
                    {
                        searchHistoryListItem.remove();
                    }
                });

                const newSearchHistoryLIButton = createSearchHistoryLIButton(prettySearchString);

                htmlUlElement.prepend(newSearchHistoryLIButton);
            }
        );

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

                    weatherForecastCard.hide();

                    weatherForecastCard.date(dt_txt);
                    weatherForecastCard.icon(icon);
                    weatherForecastCard.temp(temp);
                    weatherForecastCard.windSpeed(windSpeed);
                    weatherForecastCard.humidity(humidity);

                    weatherForecastCard.show();
                }

                weatherForecastHeader.style.display = "block";
            }
        );

    }
}
