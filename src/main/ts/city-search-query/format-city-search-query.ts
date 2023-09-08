import { isNotBlank } from "./is-valid-city-search-query";

const whiteSpaces = /\s{2,}/g;

export function formatCitySearchQuery(aString: string): string;
export function formatCitySearchQuery(strings: string[]): string[];
export function formatCitySearchQuery(aStringOrStrings: string | string[]): string | string[]
{
    if (aStringOrStrings instanceof Array)
    {
        return aStringOrStrings.filter(str => isNotBlank(str)).map(str => str.trim().replaceAll(whiteSpaces, "\u0020"));
    }
    else
    {
        return aStringOrStrings.trim().replaceAll(whiteSpaces, "\u0020");
    }
}
