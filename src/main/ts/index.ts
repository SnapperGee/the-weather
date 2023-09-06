import $ from "jquery";

const $h1 = $("<h1>").addClass(["text-white", "fw-bold"]).text("The Weather");
const $header = $("<header>").addClass(["d-flex", "align-items-center", "justify-content-center"]).append($h1);

const $citySearchLabel = $("<label>").prop({for: "searchCityInput"}).addClass(["fw-bold", "fs-3"]).text("Search for a City:");
const $citySearchInput = $("<input>").prop({id: "searchCityInput", type: "text", name: "searchCityInput"}).addClass(["w-100", "d-block"]);
const $citySearchLabelAndInput = $citySearchLabel.add($citySearchInput);

const $citySearchColumn = $("<aside>").addClass("col-3").append($citySearchLabelAndInput);

const $dayWeatherInfoColumn = $("<section>").addClass("col-12");
const $weatherForecastInfoColumn = $("<section>").addClass("col-12");
const $weatherInfoColumn = $("<div>").addClass("col-9").append($dayWeatherInfoColumn, $weatherForecastInfoColumn);

const $mainRow = $("<div>").addClass("row").append($citySearchColumn, $weatherInfoColumn);

const $container = $("<main>").addClass(["container-fluid"]).append($mainRow);

$("body").append($header, $container);
