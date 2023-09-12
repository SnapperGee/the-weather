import citiesJson from "../resources/current.city.list.json";

export interface Coordinates {lon: number, lat: number};

export interface City {id: number, name: string, country: string, coord: Coordinates};

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
