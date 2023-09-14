/**
 * @module weather-day-card
 */

import { DEFAULT_ICON_ALT, type Icon } from "./util";

/**
 * This class is responsible for representing the DOM card element for the current day weather. It contains methods that
 * make updating its various children's text content easier as well as validates the elements used to construct object
 * instances
 */
export class CurrentWeatherCard
{
    readonly #htmlSectionElement: HTMLElement;
    #cityName: string;
    #date: string;
    #icon: Icon;
    #temp: number;
    #windSpeed: number;
    #humidity: number;

    readonly #cityNameAndDateTitle: HTMLHeadingElement;
    readonly #weatherConditionImg: HTMLImageElement;
    readonly #tempParagraph: HTMLParagraphElement;
    readonly #windParagraph: HTMLParagraphElement;
    readonly #humidityParagraph: HTMLParagraphElement;

    /**
     * Constructs a {@link CurrentWeatherCard} object instances.
     *
     * @param htmlCardElement The root `HTMLElement` of the created card object.
     *
     * @param cityName The city name `string` paragraph text content of the created card object.
     *
     * @param date The date `string` paragraph text content of the created card object.
     *
     * @param icon The `src` and `alt` attribute of the created card object's weather icon img.
     *
     * @param temp The temp `number` paragraph text content of the created card object.
     *
     * @param windSpeed The wind speed `number` paragraph text content of the created card object.
     *
     * @param humidity The humidity `number` paragraph text content of the created card object.
     *
     * @returns A newly constructed {@link CurrentWeatherCard} object instance.
     *
     * @throws {@link TypeError} if an of the passed arguments are `undefined or `null`.
     */
    public constructor( htmlCardElement: NonNullable<HTMLElement>,
                        cityName: NonNullable<string>,
                        date: NonNullable<string>,
                        icon: NonNullable<string | Icon>,
                        temp: NonNullable<number>,
                        windSpeed: NonNullable<number>,
                        humidity: NonNullable<number> )
    {
        if (htmlCardElement === undefined || htmlCardElement === null)
        {
            throw new TypeError(`${new.target.name}: ${htmlCardElement} HTML section element.`);
        }

        if (cityName === undefined || cityName === null)
        {
            throw new TypeError(`${new.target.name}: ${cityName} city name string.`);
        }

        if (date === undefined || date === null)
        {
            throw new TypeError(`${new.target.name}: ${date} date string.`);
        }

        if (icon === undefined || icon === null)
        {
            throw new TypeError(`${new.target.name}: ${icon} icon string.`);
        }

        if (temp === undefined || temp === null)
        {
            throw new TypeError(`${new.target.name}: ${temp} temp number.`);
        }

        if (windSpeed === undefined || windSpeed === null)
        {
            throw new TypeError(`${new.target.name}: ${windSpeed} wind number.`);
        }

        if (humidity === undefined || humidity === null)
        {
            throw new TypeError(`${new.target.name}: ${humidity} humidity number.`);
        }

        this.#htmlSectionElement = htmlCardElement;
        this.#cityName = cityName;
        this.#date = date;
        this.#icon = typeof icon === "string" ? {src: icon, alt: DEFAULT_ICON_ALT} : icon;
        this.#temp = temp;
        this.#windSpeed = windSpeed;
        this.#humidity = humidity;

        this.#cityNameAndDateTitle = this.#htmlSectionElement.querySelector("h2")!;
        this.#weatherConditionImg = this.#htmlSectionElement.querySelector("img")!;

        const paragraphs = this.#htmlSectionElement.querySelectorAll("p");

        this.#tempParagraph = paragraphs.item(0);
        this.#windParagraph = paragraphs.item(1);
        this.#humidityParagraph = paragraphs.item(2);

        this.#cityNameAndDateTitle.textContent = `${this.#cityName} (${this.#date})`;

        this.#weatherConditionImg.src = this.#icon.src;
        this.#weatherConditionImg.alt = this.#icon.alt;

        this.#tempParagraph.textContent = `Temp: ${this.#temp} °F`;
        this.#windParagraph.textContent = `Wind: ${this.#windSpeed} MPH`;
        this.#humidityParagraph.textContent = `Humidity: ${this.#humidity} %`;
    }

    /**
     * Sets this card's header text content.
     *
     * @param cityName The `string` to set this card's header text content to.
     *
     * @returns this object instance.
     */
    public cityName(cityName: NonNullable<string>): CurrentWeatherCard
    {
        if (cityName === undefined || cityName === null)
        {
            throw new TypeError(`${this.cityName.name}: ${cityName} city name string.`);
        }

        this.#cityName = cityName;
        this.#cityNameAndDateTitle.textContent = `${this.#cityName} (${this.#date})`;
        return this;
    }

    /**
     * Sets this card's dat paragraph text content.
     *
     * @param date The `string` to set this card's date paragraph text content to.
     *
     * @returns this object instance.
     */
    public date(date: NonNullable<string>): CurrentWeatherCard
    {
        if (date === undefined || date === null)
        {
            throw new TypeError(`${this.date.name}: ${date} date string.`);
        }

        this.#date = date;
        this.#cityNameAndDateTitle.textContent = `${this.#cityName} (${this.#date})`;
        return this;
    }

    /**
     * Sets this card's weather icon img src and alt attribute.
     *
     * @param icon Object containing the src and alt attribute to set this card's img to.
     *
     * @returns this object instance.
     */
    public icon(icon: NonNullable<string | Icon>): CurrentWeatherCard
    {
        if (icon === undefined || icon === null)
        {
            throw new TypeError(`${this.icon.name}: ${icon} icon string or object.`);
        }

        this.#icon = typeof icon === "string" ? {src: icon, alt: DEFAULT_ICON_ALT} : icon;
        this.#weatherConditionImg.src = this.#icon.src;
        this.#weatherConditionImg.alt = this.#icon.alt;
        return this;
    }

    /**
     * Sets this card's temp paragraph text content.
     *
     * @param date The `number` to set this card's temp paragraph text content to.
     *
     * @returns this object instance.
     */
    public temp(temp: NonNullable<number>): CurrentWeatherCard
    {
        if (temp === undefined || temp === null)
        {
            throw new TypeError(`${this.temp.name}: ${temp} number.`);
        }

        this.#temp = temp;
        this.#tempParagraph.textContent = `Temp: ${this.#temp} °F`;
        return this;
    }

    /**
     * Sets this card's wind speed paragraph text content.
     *
     * @param date The `number` to set this card's wind speed paragraph text content to.
     *
     * @returns this object instance.
     */
    public windSpeed(windSpeed: NonNullable<number>): CurrentWeatherCard
    {
        if (windSpeed === undefined || windSpeed === null)
        {
            throw new TypeError(`${this.windSpeed.name}: ${windSpeed} wind speed number.`);
        }

        this.#windSpeed = windSpeed;
        this.#windParagraph.textContent = `Wind: ${this.#windSpeed} MPH`;
        return this;
    }

    /**
     * Sets this card's humidity paragraph text content.
     *
     * @param date The `number` to set this card's humidity paragraph text content to.
     *
     * @returns this object instance.
     */
    public humidity(humidity: NonNullable<number>): CurrentWeatherCard
    {
        if (humidity === undefined || humidity === null)
        {
            throw new TypeError(`${this.humidity.name}: ${humidity} humidity number.`);
        }
        this.#humidity = humidity;
        this.#humidityParagraph.textContent = `Humidity: ${this.#humidity} %`;
        return this;
    }

    /**
     * Makes this card visible in the viewport.
     *
     * @returns this object instance.
     */
    public show(): CurrentWeatherCard
    {
        this.#htmlSectionElement.classList.remove("d-none");
        return this;
    }

    /**
     * Makes this card hidden in the viewport.
     *
     * @returns this object instance.
     */
    public hide(): CurrentWeatherCard
    {
        this.#htmlSectionElement.classList.add("d-none");
        return this;
    }
}

/**
 * Factory method to create {@link CurrentWeatherCard} object instances.
 *
 * @param htmlCardElement The root `HTMLElement` of the created card object.
 *
 * @param cityName The city name `string` paragraph text content of the created card object.
 *
 * @param date The date `string` paragraph text content of the created card object.
 *
 * @param icon The `src` and `alt` attribute of the created card object's weather icon img.
 *
 * @param temp The temp `number` paragraph text content of the created card object.
 *
 * @param windSpeed The wind speed `number` paragraph text content of the created card object.
 *
 * @param humidity The humidity `number` paragraph text content of the created card object.
 *
 * @returns A newly constructed {@link CurrentWeatherCard} object instance.
 *
 * @throws {@link TypeError} if the passed root `HTMLElement` is `undefined or `null`.
 */
export function currentWeatherCard( htmlCardElement: HTMLElement | null,
                                cityName: string,
                                date: string,
                                icon: string | Icon,
                                temp: number,
                                windSpeed: number,
                                humidity: number ): CurrentWeatherCard
{
    if (htmlCardElement === undefined || htmlCardElement === null)
    {
        throw new TypeError(`${currentWeatherCard.name}: ${htmlCardElement} HTML element.`);
    }

    return new CurrentWeatherCard(htmlCardElement, cityName, date, icon, temp, windSpeed, humidity);
}

export default currentWeatherCard;
