export const searchSubmitEvent = ( mouseEvent: MouseEvent,
                                   htmlInputElement: NonNullable<HTMLInputElement>,
                                   htmlLIElement: NonNullable<HTMLUListElement> ): void =>
{
    mouseEvent.preventDefault();

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
