/**
 * @module search-query
 */

const isNotBlankRegex: RegExp = /\S+/;
const commaSurroundedByNonBlank: RegExp = /\S+.*,.*\S+/;
const twoOrMoreWhiteSpaces = /\s{2,}/g;
const commaFollowedBy2AdjacentNonWhitespaceChars = /^,\s*\S{2}\s*$/;

export const isNotBlank = (aString: string): boolean => isNotBlankRegex.test(aString);
export const isBlank = (aString: string): boolean => ! isNotBlankRegex.test(aString);

/**
 * Checks to see if a provided `string` is a valid city search query format. That is, either a single string containing
 * no commas and at least one non-whitespace character, such as "San Francisco", or a string containing a single comma
 * with at least one non-whitespace character before the comma and only 2 non-whitespace characters after the comma such
 * as "Berkeley, US".
 *
 * @param aString `string` to check if it's a valid city search query format.
 *
 * @returns `true` if the passed `string` argument is formatted correctly for a city search query.
 */
export const isValidSearchFormat = (aString: string): boolean =>
{
    // empty/blank string is invalid
    if (isBlank(aString))
    {
        return false;
    }

    let commaCharCount = 0;

    // string that contains more than 1 comma or a comma that doesn't have non-whitespace on both sides
    if (aString.includes(","))
    {
        // make sure string only has 1 (or less) commas
        for (const char of aString)
        {
            if (char === "," && ++commaCharCount > 1)
            {
                return false;
            }
        }

        // make sure string has at least 1 non-whitespace character on each side of comma
        if ( ! commaSurroundedByNonBlank.test(aString))
        {
            return false;
        }

        // Make sure that there's only 2 adjacent non whitespace characters after comma
        if ( ! commaFollowedBy2AdjacentNonWhitespaceChars.test(aString.substring(aString.indexOf(","))))
        {
            return false;
        }
    }

    return true;
}

/**
 * Formats a single `string` to a consistent format.
 *
 * @param aString `string` to format to a consistent city search query format.
 *
 * @returns the formatted `string`.
 */
export function formatSearchQuery(aString: string): string;

/**
 * Formats an array of strings to a consistent format. It removes all leading and trailing whitespace from each string
 * and capitalizes the first character of the first string and converts the second string to uppercase. So
 * " san   francisco  , uS " would become "San Francisco, US".
 *
 * @param strings An array of `string`s to format to a consistent format.
 *
 * @returns An array containing the formatted `string`s.
 */
export function formatSearchQuery(strings: string[]): string[];
export function formatSearchQuery(aStringOrStrings: string | string[]): string | string[]
{
    if (aStringOrStrings instanceof Array)
    {
        return aStringOrStrings.filter(str => isNotBlank(str)).map((str, index) => {

            const whiteSpaceFormattedString = str.trim().replaceAll(twoOrMoreWhiteSpaces, "\u0020");

            let formattedString;

            if (index === 0)
            {
                formattedString = whiteSpaceFormattedString.split("\u0020").map(aStr => aStr[0].toUpperCase() + aStr.substring(1)).join("\u0020")
            }
            else
            {
                formattedString = whiteSpaceFormattedString.toUpperCase()
            }

            return formattedString;
        });
    }
    else
    {
        return aStringOrStrings.trim().replaceAll(twoOrMoreWhiteSpaces, "\u0020");
    }
}
