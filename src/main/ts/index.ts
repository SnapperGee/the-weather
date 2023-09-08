import { SearchCityButton } from "./search-city-button";
import "./city-list";
import createSearchHistoryLIButton from "./create-search-history-li-button"
import { type WeatherDayCard, weatherDayCard as createWeatherDayCard } from "./weather-day-card"

const searchCityHtmlTextInput = document.getElementById("searchCityInput");
const searchCityHtmlButton = document.getElementById("searchCityButton");
const searchCityHistoryUlElement = document.getElementById("citySearchHistoryList");

const searchHistoryLiButton = createSearchHistoryLIButton("Blep");

searchCityHistoryUlElement?.appendChild(searchHistoryLiButton);

const weatherDayCard: WeatherDayCard = createWeatherDayCard(
    document.getElementById("weatherDayCard"),
    "San Francisco",
    "02/27/1992",
    "",
    11,
    10,
    10
).show();

const searchCityButton = new SearchCityButton(<HTMLButtonElement> searchCityHtmlButton, <HTMLInputElement> searchCityHtmlTextInput, <HTMLUListElement> searchCityHistoryUlElement);
