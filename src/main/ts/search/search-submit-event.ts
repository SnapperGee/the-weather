export const searchSubmitEvent = ( submitEvent: SubmitEvent,
                                   htmlInputElement: NonNullable<HTMLInputElement>,
                                   htmlUlElement: NonNullable<HTMLUListElement> ): void =>
{
    if (htmlInputElement === undefined || htmlInputElement === null)
    {
        throw new TypeError(`${searchSubmitEvent.name}: ${htmlInputElement} HTML input element.`);
    }

    if (htmlUlElement === undefined || htmlUlElement === null)
    {
        throw new TypeError(`${searchSubmitEvent.name}: ${htmlUlElement} HTML Ul element.`);
    }

    submitEvent.preventDefault();

    console.log("\n\n\n", "BLEEP", "\n\n\n");

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
