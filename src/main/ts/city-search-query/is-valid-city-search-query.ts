const isNotBlankRegex: RegExp = /\S+/;
const commaSurroundedByNonBlank: RegExp = /\S+.*,.*\S+/;

export const isNotBlank = (aString: string): boolean => isNotBlankRegex.test(aString);
export const isBlank = (aString: string): boolean => ! isNotBlankRegex.test(aString);

export const isValidCitySearchQuery = (aString: string): boolean =>
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
    }

    return true;
}
