import createSearchHistoryLIButton from "./search/create-search-history-li-button";
import { type WeatherDayCard, weatherDayCard as createWeatherDayCard } from "./weather-day-card";
import { type WeatherForecastCard, weatherForecastCard } from "./weather-forecast-card";
import { searchSubmitEvent } from "./search/search-submit-event"

const weatherForecastColumns = document.getElementsByClassName("weatherForecastColumn") as HTMLCollectionOf<HTMLElement>;

const weatherDayCard: WeatherDayCard = createWeatherDayCard(
    document.getElementById("weatherDayCard"),
    "", "", "", 0, 0, 0
);

const weatherForecastCard1: WeatherForecastCard = weatherForecastCard(
    weatherForecastColumns.item(0),
    "", "", 0, 0, 0
);

const weatherForecastCard2: WeatherForecastCard = weatherForecastCard(
    weatherForecastColumns.item(1),
    "", "", 0, 0, 0
);

const weatherForecastCard3: WeatherForecastCard = weatherForecastCard(
    weatherForecastColumns.item(2),
    "", "", 0, 0, 0
);

const weatherForecastCard4: WeatherForecastCard = weatherForecastCard(
    weatherForecastColumns.item(3),
    "", "", 0, 0, 0
);

const weatherForecastCard5: WeatherForecastCard = weatherForecastCard(
    weatherForecastColumns.item(4),
    "", "", 0, 0, 0
);

const searchCityInput = document.getElementById("searchInput") as HTMLInputElement;
const searchCityForm = document.getElementById("searchForm");
const citySearchHistoryUlElement = document.getElementById("citySearchHistoryList") as HTMLUListElement;
const weatherForecastHeader = document.getElementById("forecastHeaderRow");

searchCityForm?.addEventListener("submit", event => { searchSubmitEvent(
    event,
    searchCityInput,
    weatherDayCard,
    weatherForecastHeader!,
    [
        weatherForecastCard1, weatherForecastCard2, weatherForecastCard3,
        weatherForecastCard4, weatherForecastCard5
    ],
    citySearchHistoryUlElement)
});

const searchHistoryLiButton = createSearchHistoryLIButton("Blep");

citySearchHistoryUlElement?.appendChild(searchHistoryLiButton);
