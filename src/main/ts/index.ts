import { type CurrentWeatherCard, currentWeatherCard as createWeatherDayCard } from "./current-weather-card";
import { type WeatherForecastCard, weatherForecastCard } from "./weather-forecast-card";
import { searchSubmitEvent } from "./search/search-submit-event";
import { createSearchHistoryLIButton } from "./search/create-search-history-li-button";
import { searchHistoryButtonClickEvent } from "./search/search-history-button-click-event";
import dom from "./dom";

// Init empty weather day card object to set values when city search query is processed
const currentWeatherCard: CurrentWeatherCard = createWeatherDayCard(
    dom.currentWeatherCard(),
    "", "", "", 0, 0, 0
);

// Init empty weather forecast card object for first day to set values when city search query is processed
const weatherForecastCard1: WeatherForecastCard = weatherForecastCard(
    dom.weatherForecastColumns().item(0),
    "", "", 0, 0, 0
);

// Init empty weather forecast card object for second day to set values when city search query is processed
const weatherForecastCard2: WeatherForecastCard = weatherForecastCard(
    dom.weatherForecastColumns().item(1),
    "", "", 0, 0, 0
);

// Init empty weather forecast card object for third day to set values when city search query is processed
const weatherForecastCard3: WeatherForecastCard = weatherForecastCard(
    dom.weatherForecastColumns().item(2),
    "", "", 0, 0, 0
);

// Init empty weather forecast card object for fourth day to set values when city search query is processed
const weatherForecastCard4: WeatherForecastCard = weatherForecastCard(
    dom.weatherForecastColumns().item(3),
    "", "", 0, 0, 0
);

// Init empty weather forecast card object for fifth day to set values when city search query is processed
const weatherForecastCard5: WeatherForecastCard = weatherForecastCard(
    dom.weatherForecastColumns().item(4),
    "", "", 0, 0, 0
);

// Init fragment to collect search history buttons stored in local storage
const searchHistoryButtons = document.createDocumentFragment();

// Retrieve stored search history from local storage as string
const searchHistoryString: string | null = localStorage.getItem("searchHistory");

// Convert retrieved search history from local storage to array or set to empty array if there's no stored search history
const searchHistoryStringArray: readonly string[] = searchHistoryString !== null ? JSON.parse(searchHistoryString) : [];

// Create array of weather forecast card objects to be passed to search history button and search form submit event listeners
const weatherForecastCards =
    [weatherForecastCard1, weatherForecastCard2, weatherForecastCard3, weatherForecastCard4, weatherForecastCard5];

// Create button from each stored search history string
searchHistoryStringArray.forEach(searchHistoryString => {
    const searchHistoryLIButton = createSearchHistoryLIButton(searchHistoryString);

    searchHistoryLIButton.addEventListener("click", event => searchHistoryButtonClickEvent( event,
                                            dom.searchForm(),
                                            currentWeatherCard,
                                            dom.weatherForecastRow(),
                                            weatherForecastCards ))

    searchHistoryButtons.appendChild(searchHistoryLIButton);
});

// Append all created search history buttons to search history list in DOM
dom.searchHistoryButtonList().appendChild(searchHistoryButtons);

// Make it so search form button updates weather day card and forecast cards
dom.searchForm().addEventListener("submit", event => { searchSubmitEvent(
    event,
    dom.searchInput(),
    currentWeatherCard,
    dom.weatherForecastRow(),
    weatherForecastCards,
    dom.searchHistoryButtonList())
});
