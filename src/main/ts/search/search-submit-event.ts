/**
 * @module search-submit-event
 */

import { fetchCurrentWeatherData, fetchWeatherForecastData as fetchWeatherForecastData, isRecognizedCityAndCountryName, isRecognizedCityName, isRecognizedCountryName } from "../cities";
import { Icon, convertKelvinToFahrenheit, createOpenWeatherMapIconSrc, formatDateString } from "../util";
import { CurrentWeatherCard } from "../current-weather-card";
import { WeatherForecastCard } from "../weather-forecast-card";
import { formatSearchQuery, isValidSearchFormat } from "./search-query";
import { createSearchHistoryLIButton } from "./create-search-history-li-button";
import { searchHistoryButtonClickEvent } from "./search-history-button-click-event";
import dom from "../dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(tz);

/**
 * The function that fires when the city search form is submitted. It updates the current weather and 5 day forecast
 * cards with the OpenWeatherMap API response data and makes them visible.
 *
 * @param submitEvent The submit event that triggered this function.
 *
 * @param htmlInputElement The city text input to use for the API call.
 *
 * @param currentWeatherCard The card to update with the current weather API response data.
 *
 * @param weatherForecastRow The row containing the weather forecast cards to hide and show.
 *
 * @param weatherForecastCards The card to update with the day weather forecast API response data.
 *
 * @param htmlUlElement The search history buttons list to update with the city text input.
 */
export const searchSubmitEvent = ( submitEvent: SubmitEvent,
                                   htmlInputElement: NonNullable<HTMLInputElement>,
                                   currentWeatherCard: CurrentWeatherCard,
                                   weatherForecastRow: HTMLDivElement,
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

    // The raw user inputted text to be used to search the city to get the weather data for.
    const searchQueryString = htmlInputElement.value;

    // Format the raw user input to a more consistent format.
    const formattedSearchQuery =   searchQueryString.includes(",")
                                 ? formatSearchQuery(searchQueryString.split(","))
                                 : formatSearchQuery(searchQueryString);

    // If user input isn't a valid format, display alert and don't make a call to weather API. ATM, it only accepts
    // formats consisting of comma separated city names and country names.
    if ( ! isValidSearchFormat(searchQueryString) || typeof formattedSearchQuery === "string")
    {
        alert(`Invalid search query string format: "${searchQueryString}".\n\nA city name followed by a comma and 2 letter country name expected such as:\n\n San Francisco, US`);
        return;
    }

    // If user input doesn't contain a recognized city name, display alert and don't make a call to weather API
    if ( ! isRecognizedCityName(formattedSearchQuery[0]))
    {
        alert(`Unrecognized city name: "${formattedSearchQuery[0]}"`);
        return;
    }

    // If user input doesn't contain a recognized country name, display alert and don't make a call to weather API
    if ( ! isRecognizedCountryName(formattedSearchQuery[1]))
    {
        alert(`Unrecognized country name: "${formattedSearchQuery[1]}"`);
        return;
    }

    if ( ! isRecognizedCityAndCountryName(formattedSearchQuery[0], formattedSearchQuery[1]))
    {
        alert(`The following city and country name combination isn't recognized: "${formattedSearchQuery[0]}, ${formattedSearchQuery[1]}"`);
        return;
    }

    const searchHistoryString: string | null = localStorage.getItem("searchHistory");

    const searchHistoryArray: string[] = searchHistoryString !== null ? JSON.parse(searchHistoryString) : [];

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

            // Combine the formatted search string parts into a single string
            const prettySearchString = formattedSearchQuery.join(", ");

            // Replace the user's text input with formatted string
            htmlInputElement.value = prettySearchString;

            // Check to see if user already has search history of this search
            const preExistingSearchHistoryIndex = searchHistoryArray.findIndex(preExistingSearchHistoryString => prettySearchString.localeCompare(preExistingSearchHistoryString, undefined, {sensitivity: "base"}) === 0);

            // If there is any search history for this search, delete it from the search history
            if (preExistingSearchHistoryIndex !== -1)
            {
                searchHistoryArray.splice(preExistingSearchHistoryIndex, 1);
            }
            // If there isn't any search history for this search and there's 20 or more search histories saved, delete the oldest search history
            else if (searchHistoryArray.length >= 20)
            {
                searchHistoryArray.pop();
            }

            // Insert last search history to beginning of search history
            searchHistoryArray.unshift(prettySearchString);

            // Save search history to local storage
            localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArray));

            // Get search history LI Buttons
            const searchHistoryListItemButtons = Array.from(dom.searchHistoryLIButtons());

            // LI Button to prepend to search history LI Buttons list
            let liButtonItem: HTMLLIElement | undefined = undefined;

            // If there's a pre-existing LI search history button, use it as the button to prepend to search history
            // button list, otherwise create new search history button to prepend to search history button list.
            if ( (liButtonItem = searchHistoryListItemButtons.find(searchHistoryLIButton => searchHistoryLIButton.querySelector("button")?.textContent?.localeCompare(prettySearchString, undefined, {sensitivity: "base"}) === 0)) === undefined )
            {
                const newSearchHistoryButton = createSearchHistoryLIButton(prettySearchString);

                newSearchHistoryButton.addEventListener("click", event => searchHistoryButtonClickEvent(
                    event,
                    dom.searchForm(),
                    currentWeatherCard,
                    weatherForecastRow,
                    weatherForecastCards
                ));

                liButtonItem = newSearchHistoryButton;
            }

            htmlUlElement.prepend(liButtonItem);
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

                // The associated weather forecast card day
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

    // Remove bootstrap classes for initial page layout if this is the first city search query.
    dom.rootRow().classList.remove("justify-content-center");
    dom.weatherInfoColumn().classList.remove("d-none");
}
