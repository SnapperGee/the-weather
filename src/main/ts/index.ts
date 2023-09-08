import { SearchCityButton } from "./search-city-button";
import "./city-list";
import createSearchHistoryLIButton from "./create-search-history-li-button"

const searchCityHtmlTextInput = document.getElementById("searchCityInput");
const searchCityHtmlButton = document.getElementById("searchCityButton");
const searchCityHistoryUlElement = document.getElementById("citySearchHistoryList");

const searchHistoryLiButton = createSearchHistoryLIButton("Blep");

searchCityHistoryUlElement?.appendChild(searchHistoryLiButton);

const weatherDayCard = document.getElementById("weatherDayCard");

const searchCityButton = new SearchCityButton(<HTMLButtonElement> searchCityHtmlButton, <HTMLInputElement> searchCityHtmlTextInput, <HTMLUListElement> searchCityHistoryUlElement);
