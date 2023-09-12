import citiesJson from "../resources/current.city.list.json";
import { API_KEY } from "./env";
import { type WeatherAPIResponse } from "./weather-api-response";

export interface Coordinates {lon: number, lat: number};

export interface City {name: string, country: string, coord: Coordinates};

export const cities: readonly City[] = Object.freeze(citiesJson) as readonly City[];

export const cityNames: ReadonlySet<string> = Object.freeze(new Set(cities.map(city => city.name.toUpperCase())));

export const countryNames: ReadonlySet<string> = Object.freeze(new Set(cities.map(city => city.country.toUpperCase())));

export const isRecognizedCityName = (aString: string): boolean => cityNames.has(aString.toUpperCase());

export const isRecognizedCountryName = (aString: string): boolean => countryNames.has(aString.toUpperCase());

export function getCity(name: string, country: string): City | undefined
{
    if (isRecognizedCityName(name) && isRecognizedCountryName(country))
    {
        return cities.find(city =>
                name.localeCompare(city.name, undefined, {sensitivity: "base"}) === 0
                && country.localeCompare(city.country, undefined, {sensitivity: "base"}) === 0 );
    }

    return undefined;
}

export function createCityWeatherFetchString(city: string, country: string): string
{
    const cityCoordinates: Coordinates | undefined = getCity(city, country)?.coord;

    if (cityCoordinates === undefined)
    {
        throw new TypeError(`${createCityWeatherFetchString.name}: Could not find city: "${city}", "${country}"`);
    }

    return `https://api.openweathermap.org/data/2.5/forecast?lat=${cityCoordinates.lat}&lon=${cityCoordinates.lon}&appid=${API_KEY}`;
}

export async function fetchWeatherData(city: string, country: string): Promise<WeatherAPIResponse>
{
    const cityWeatherFetchString = createCityWeatherFetchString(city, country);

    return fetch(cityWeatherFetchString)
        .then(response => response.json())
        .catch(err => {throw new Error(err)});
}
