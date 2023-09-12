import { searchSubmitEvent } from "./search-submit-event";

export class SearchButton
{
    readonly #htmlButtonElement: HTMLButtonElement;
    readonly #htmlInputElement: HTMLInputElement;
    readonly #htmlUlElement: HTMLUListElement;

    public constructor( htmlButtonElement: NonNullable<HTMLButtonElement>,
                        htmlInputElement: NonNullable<HTMLInputElement>,
                        htmlUlElement: NonNullable<HTMLUListElement>)
    {
        if (htmlButtonElement === undefined || htmlButtonElement === null)
        {
            throw new TypeError(`${new.target.name}: ${htmlButtonElement} HTML button element.`);
        }

        if (htmlInputElement === undefined || htmlInputElement === null)
        {
            throw new TypeError(`${new.target.name}: ${htmlInputElement} HTML input element.`);
        }

        if (htmlUlElement === undefined || htmlUlElement === null)
        {
            throw new TypeError(`${new.target.name}: ${htmlUlElement} HTML UL element.`);
        }

        this.#htmlButtonElement = htmlButtonElement;
        this.#htmlInputElement = htmlInputElement;
        this.#htmlUlElement = htmlUlElement;

        this.#htmlButtonElement.addEventListener("click", event => searchSubmitEvent(event, this.#htmlInputElement, this.#htmlUlElement));
    }

    public get HTMLButtonElement(): HTMLButtonElement { return this.#htmlButtonElement; }
}
