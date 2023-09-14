import { type WeatherDayCard, weatherDayCard as createWeatherDayCard } from "./weather-day-card";
import { type WeatherForecastCard, weatherForecastCard } from "./weather-forecast-card";
import { searchSubmitEvent } from "./search/search-submit-event";
import { createSearchHistoryLIButton } from "./search/create-search-history-li-button";
import { searchHistoryButtonClickEvent } from "./search/search-history-button-click-event";
import dom from "./dom";

const weatherDayCard: WeatherDayCard = createWeatherDayCard(
    dom.weatherDayCard(),
    "", "", "", 0, 0, 0
);

const weatherForecastCard1: WeatherForecastCard = weatherForecastCard(
    dom.weatherForecastColumns().item(0),
    "", "", 0, 0, 0
);

const weatherForecastCard2: WeatherForecastCard = weatherForecastCard(
    dom.weatherForecastColumns().item(1),
    "", "", 0, 0, 0
);

const weatherForecastCard3: WeatherForecastCard = weatherForecastCard(
    dom.weatherForecastColumns().item(2),
    "", "", 0, 0, 0
);

const weatherForecastCard4: WeatherForecastCard = weatherForecastCard(
    dom.weatherForecastColumns().item(3),
    "", "", 0, 0, 0
);

const weatherForecastCard5: WeatherForecastCard = weatherForecastCard(
    dom.weatherForecastColumns().item(4),
    "", "", 0, 0, 0
);

const searchHistoryButtons = document.createDocumentFragment();

const searchHistoryString: string | null = localStorage.getItem("searchHistory");

const searchHistoryStringArray: readonly string[] = searchHistoryString !== null ? JSON.parse(searchHistoryString) : [];

const weatherForecastCards =
    [weatherForecastCard1, weatherForecastCard2, weatherForecastCard3, weatherForecastCard4, weatherForecastCard5];

searchHistoryStringArray.forEach(searchHistoryString => {
    const searchHistoryLIButton = createSearchHistoryLIButton(searchHistoryString);

    searchHistoryLIButton.addEventListener("click", event => searchHistoryButtonClickEvent( event,
                                            dom.searchForm(),
                                            weatherDayCard,
                                            dom.weatherForecastRow(),
                                            weatherForecastCards ))

    searchHistoryButtons.appendChild(searchHistoryLIButton);
});

dom.searchHistoryButtonList().appendChild(searchHistoryButtons);

dom.searchForm().addEventListener("submit", event => { searchSubmitEvent(
    event,
    dom.searchInput(),
    weatherDayCard,
    dom.weatherForecastRow(),
    weatherForecastCards,
    dom.searchHistoryButtonList())
});
