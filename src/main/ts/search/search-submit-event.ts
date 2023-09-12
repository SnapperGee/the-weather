import { isRecognizedCityName, isRecognizedCountryName } from "../cities";
import { formatSearchQuery, isValidSearchFormat } from "./search-query";

export const searchSubmitEvent = ( submitEvent: SubmitEvent,
                                   htmlInputElement: NonNullable<HTMLInputElement>,
                                   htmlUlElement: NonNullable<HTMLUListElement> ): void =>
{
    submitEvent.preventDefault();

    if (htmlInputElement === undefined || htmlInputElement === null)
    {
        throw new TypeError(`${searchSubmitEvent.name}: ${htmlInputElement} HTML input element.`);
    }

    if (htmlUlElement === undefined || htmlUlElement === null)
    {
        throw new TypeError(`${searchSubmitEvent.name}: ${htmlUlElement} HTML Ul element.`);
    }

    const searchQueryString = htmlInputElement.value;

    if ( ! isValidSearchFormat(searchQueryString))
    {
        console.log(`Invalid search query string format: "${searchQueryString}". city name, [county] expected.`);
    }

    const formattedSearchQuery =   searchQueryString.includes(",")
                                 ? formatSearchQuery(searchQueryString.split(","))
                                 : formatSearchQuery(searchQueryString);

    if (typeof formattedSearchQuery === "string")
    {
        if ( ! isRecognizedCityName(formattedSearchQuery))
        {
            console.log(`Unrecognized city name: "${searchQueryString}"`);
        }
    }
    else
    {
        if ( ! isRecognizedCityName(formattedSearchQuery[0]))
        {
            console.log(`Unrecognized city name: "${formattedSearchQuery[0]}"`);
        }

        if ( ! isRecognizedCountryName(formattedSearchQuery[0]))
        {
            console.log(`Unrecognized country name: "${formattedSearchQuery[0]}"`);
        }
    }

    let formattedHtmlInput: string;

    // if (htmlInputElement.checkValidity() && (formattedHtmlInput = stringNotEmptyOrBlank(htmlInputElement.value)))
    // {
    //     console.log("Valid city search input.");
    // }
    // else
    // {
    //     console.log("Invalid city search input.");
    // }
}
