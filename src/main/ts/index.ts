import { SearchCityButton } from "./search-city-button";
import cityListJson from "../resources/current.city.list.json";

const searchCityTextInput = document.getElementById("searchCityInput");
const searchCityHtmlButton = document.getElementById("searchCityButton");
const searchCityHistoryUlElement = document.getElementById("citySearchHistory");

const searchCityButton = new SearchCityButton(<HTMLButtonElement> searchCityHtmlButton, <HTMLInputElement> searchCityTextInput, <HTMLUListElement> searchCityHistoryUlElement);

console.log(cityListJson);
