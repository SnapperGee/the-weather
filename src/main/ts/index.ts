import { type WeatherDayCard, weatherDayCard as createWeatherDayCard } from "./weather-day-card";
import { type WeatherForecastCard, weatherForecastCard } from "./weather-forecast-card";
import { searchSubmitEvent } from "./search/search-submit-event";
import { createSearchHistoryLIButton } from "./search/create-search-history-li-button";
import { searchHistoryButtonClickEvent } from "./search/search-history-button-click-event";

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

const searchForm = document.getElementById("searchForm");

const searchHistoryUlElement = document.getElementById("citySearchHistoryList");

const searchHistoryButtons = document.createDocumentFragment();

const searchHistoryString: string | null = localStorage.getItem("searchHistory");

const searchHistoryStringArray: readonly string[] = searchHistoryString !== null ? JSON.parse(searchHistoryString) : [];

searchHistoryStringArray.forEach(searchHistoryString => {
    const searchHistoryLIButton = createSearchHistoryLIButton(searchHistoryString);

    searchHistoryLIButton.addEventListener("click", event => searchHistoryButtonClickEvent( event,
                                            searchForm as HTMLFormElement,
                                            weatherDayCard,
                                            weatherForecastHeader!,
                                            [weatherForecastCard1, weatherForecastCard2, weatherForecastCard3, weatherForecastCard4, weatherForecastCard5] ))

    searchHistoryButtons.appendChild(searchHistoryLIButton);
});

searchHistoryUlElement?.appendChild(searchHistoryButtons);

const searchCityInput = document.getElementById("searchInput") as HTMLInputElement;
const citySearchHistoryUlElement = document.getElementById("citySearchHistoryList") as HTMLUListElement;
const weatherForecastHeader = document.getElementById("forecastHeaderRow");

searchForm?.addEventListener("submit", event => { searchSubmitEvent(
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
