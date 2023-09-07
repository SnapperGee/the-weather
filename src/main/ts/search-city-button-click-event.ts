const stringIsValid = (aString: string): string | false =>
{
    const formattedString = aString.trim().replace(/\s{2,}/, "\u0020");

    if (formattedString.length !== 0)
    {
        return formattedString;
    }
    else
    {
        return false;
    }
}

export const searchCityButtonClickEvent = ( mouseEvent: MouseEvent,
                                            htmlInputElement: NonNullable<HTMLInputElement>,
                                            htmlLIElement: NonNullable<HTMLUListElement> ): void =>
{
    mouseEvent.preventDefault();

    let formattedHtmlInput: string | false;

    if (htmlInputElement.checkValidity() && (formattedHtmlInput = stringIsValid(htmlInputElement.value)))
    {
        console.log("Valid city search input.");
    }
    else
    {
        console.log("Invalid city search input.");
    }
}
