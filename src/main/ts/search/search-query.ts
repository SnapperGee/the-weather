const isNotBlankRegex: RegExp = /\S+/;
const commaSurroundedByNonBlank: RegExp = /\S+.*,.*\S+/;
const twoOrMoreWhiteSpaces = /\s{2,}/g;
const commaFollowedBy2AdjacentNonWhitespaceChars = /^,\s*\S{2}\s*$/;

export const isNotBlank = (aString: string): boolean => isNotBlankRegex.test(aString);
export const isBlank = (aString: string): boolean => ! isNotBlankRegex.test(aString);

export const isValidSearchQuery = (aString: string): boolean =>
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

export function formatSearchQuery(aString: string): string;
export function formatSearchQuery(strings: string[]): string[];
export function formatSearchQuery(aStringOrStrings: string | string[]): string | string[]
{
    if (aStringOrStrings instanceof Array)
    {
        return aStringOrStrings.filter(str => isNotBlank(str)).map(str => str.trim().replaceAll(twoOrMoreWhiteSpaces, "\u0020"));
    }
    else
    {
        return aStringOrStrings.trim().replaceAll(twoOrMoreWhiteSpaces, "\u0020");
    }
}
