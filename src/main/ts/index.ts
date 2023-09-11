import { SearchCityButton } from "./search-city-button";
import createSearchHistoryLIButton from "./create-search-history-li-button";
import { type WeatherDayCard, weatherDayCard as createWeatherDayCard } from "./weather-day-card";
import { type WeatherForecastCard, weatherForecastCard } from "./weather-forecast-card";

const searchCityHtmlTextInput = document.getElementById("searchCityInput");
const searchCityHtmlButton = document.getElementById("searchCityButton");
const searchCityHistoryUlElement = document.getElementById("citySearchHistoryList");

const weatherForecastCards = document.getElementsByClassName("weatherForecastColumn") as HTMLCollectionOf<HTMLElement>;

const weatherDayCard: WeatherDayCard = createWeatherDayCard(
    document.getElementById("weatherDayCard"),
    "San Francisco",
    "12/25/2023",
    "",
    67,
    2.22,
    10
).show();

const weatherForecastCard1: WeatherForecastCard = weatherForecastCard(
    weatherForecastCards.item(0),
    "12/26/2023",
    "",
    58,
    8.99,
    25
);

const weatherForecastCard2: WeatherForecastCard = weatherForecastCard(
    weatherForecastCards.item(1),
    "12/27/2023",
    "",
    63,
    3.12,
    14
);

const weatherForecastCard3: WeatherForecastCard = weatherForecastCard(
    weatherForecastCards.item(2),
    "12/28/2023",
    "",
    61,
    1.11,
    3
);

const weatherForecastCard4: WeatherForecastCard = weatherForecastCard(
    weatherForecastCards.item(3),
    "12/29/2023",
    "",
    59,
    5.47,
    10
);

const weatherForecastCard5: WeatherForecastCard = weatherForecastCard(
    weatherForecastCards.item(4),
    "12/30/2023",
    "",
    68,
    3,
    12
);

const searchCityButton = new SearchCityButton(<HTMLButtonElement> searchCityHtmlButton, <HTMLInputElement> searchCityHtmlTextInput, <HTMLUListElement> searchCityHistoryUlElement);










const searchHistoryLiButton = createSearchHistoryLIButton("Blep");

searchCityHistoryUlElement?.appendChild(searchHistoryLiButton);
