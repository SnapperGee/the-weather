import createSearchHistoryLIButton from "./search/create-search-history-li-button";
import { type WeatherDayCard, weatherDayCard as createWeatherDayCard } from "./weather-day-card";
import { type WeatherForecastCard, weatherForecastCard } from "./weather-forecast-card";
import { searchSubmitEvent } from "./search/search-submit-event"

const weatherForecastColumns = document.getElementsByClassName("weatherForecastColumn") as HTMLCollectionOf<HTMLElement>;

const weatherDayCard: WeatherDayCard = createWeatherDayCard(
    document.getElementById("weatherDayCard"),
    "San Francisco",
    "12/25/2023",
    "",
    67,
    2.22,
    10
);

const weatherForecastCard1: WeatherForecastCard = weatherForecastCard(
    weatherForecastColumns.item(0),
    "12/26/2023",
    "",
    58,
    8.99,
    25
);

const weatherForecastCard2: WeatherForecastCard = weatherForecastCard(
    weatherForecastColumns.item(1),
    "12/27/2023",
    "",
    63,
    3.12,
    14
);

const weatherForecastCard3: WeatherForecastCard = weatherForecastCard(
    weatherForecastColumns.item(2),
    "12/28/2023",
    "",
    61,
    1.11,
    3
);

const weatherForecastCard4: WeatherForecastCard = weatherForecastCard(
    weatherForecastColumns.item(3),
    "12/29/2023",
    "",
    59,
    5.47,
    10
);

const weatherForecastCard5: WeatherForecastCard = weatherForecastCard(
    weatherForecastColumns.item(4),
    "12/30/2023",
    "",
    68,
    3,
    12
);

const searchCityInput = document.getElementById("searchInput") as HTMLInputElement;
const searchCityForm = document.getElementById("searchForm");
const citySearchHistoryUlElement = document.getElementById("citySearchHistoryList") as HTMLUListElement;

searchCityForm?.addEventListener("submit", event => searchSubmitEvent(
    event,
    searchCityInput,
    weatherDayCard,
    [
        weatherForecastCard1, weatherForecastCard2, weatherForecastCard3,
        weatherForecastCard4, weatherForecastCard5
    ],
    citySearchHistoryUlElement));










const searchHistoryLiButton = createSearchHistoryLIButton("Blep");

citySearchHistoryUlElement?.appendChild(searchHistoryLiButton);
