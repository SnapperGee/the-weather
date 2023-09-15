/**
 * @module cities
 */

import citiesJson from "../resource/current.city.list.json";
import { API_KEY } from "./env";
import { CurrentWeatherAPIResponse, type WeatherForecastAPIResponse } from "./weather-forecast-api-response";

/**
 * Object used as a container for the longitude and latitude values used for geo locating a city.
 */
export interface Coordinates {lon: number, lat: number};

export interface City {name: string, country: string, coord: Coordinates};

export const cities: readonly City[] = Object.freeze(citiesJson) as readonly City[];

const cityNames: ReadonlySet<string> = Object.freeze(new Set(cities.map(city => city.name.toUpperCase())));

const countryNames: ReadonlySet<string> = Object.freeze(new Set(cities.map(city => city.country.toUpperCase())));

export const isRecognizedCityName = (aString: string): boolean => cityNames.has(aString.toUpperCase());

export const isRecognizedCountryName = (aString: string): boolean => countryNames.has(aString.toUpperCase());

export const isRecognizedCityAndCountryName = (cityName: string, countryName: string) => cities.some(city => cityName.localeCompare(city.name, undefined, {sensitivity: "base"}) === 0 && countryName.localeCompare(city.country, undefined, {sensitivity: "base"}) === 0);

function getCity(name: string, country: string): City | undefined
{
    if (isRecognizedCityName(name) && isRecognizedCountryName(country))
    {
        return cities.find(city =>
                name.localeCompare(city.name, undefined, {sensitivity: "base"}) === 0
                && country.localeCompare(city.country, undefined, {sensitivity: "base"}) === 0 );
    }

    return undefined;
}

function createCurrentWeatherFetchString(city: string, country: string): string
{
    const cityCoordinates: Coordinates | undefined = getCity(city, country)?.coord;

    if (cityCoordinates === undefined)
    {
        throw new Error(`${createCurrentWeatherFetchString.name}: Could not find city: "${city}", "${country}"`);
    }

    return `https://api.openweathermap.org/data/2.5/weather?lat=${cityCoordinates.lat}&lon=${cityCoordinates.lon}&appid=${API_KEY}`;
}

function createWeatherForecastFetchString(city: string, country: string): string
{
    const cityCoordinates: Coordinates | undefined = getCity(city, country)?.coord;

    if (cityCoordinates === undefined)
    {
        throw new Error(`${createWeatherForecastFetchString.name}: Could not find city: "${city}", "${country}"`);
    }

    return `https://api.openweathermap.org/data/2.5/forecast?lat=${cityCoordinates.lat}&lon=${cityCoordinates.lon}&appid=${API_KEY}`;
}

/**
 * Makes a call to the OpenWeatherMap API for the current weather.
 *
 * @param city The city name to use for the weather API call.
 *
 * @param country The country name to use for the weather API call.
 *
 * @returns the current weather API response promise.
 */
export async function fetchCurrentWeatherData(city: string, country: string): Promise<CurrentWeatherAPIResponse>
{
    const cityWeatherFetchString = createCurrentWeatherFetchString(city, country);

    return fetch(cityWeatherFetchString)
        .then(response => response.json())
        .catch(err => {throw new Error(err)});
}

/**
 * Makes a call to the OpenWeatherMap API for the 5 day weather forecast.
 *
 * @param city The city name to use for the weather API call.
 *
 * @param country The country name to use for the weather API call.
 *
 * @returns the 5 day weather forecast API response promise.
 */
export async function fetchWeatherForecastData(city: string, country: string): Promise<WeatherForecastAPIResponse>
{
    const cityWeatherFetchString = createWeatherForecastFetchString(city, country);

    return fetch(cityWeatherFetchString)
        .then(response => response.json())
        .catch(err => {throw new Error(err)});
}
