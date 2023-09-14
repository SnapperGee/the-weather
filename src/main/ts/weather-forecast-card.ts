import { DEFAULT_ICON_ALT, type Icon } from "./util";

export class WeatherForecastCard
{
    readonly #htmlSectionElement: HTMLElement;
    #date: string;
    #icon: Icon;
    #temp: number;
    #windSpeed: number;
    #humidity: number;

    readonly #dateTitle: HTMLHeadingElement;
    readonly #weatherConditionImg: HTMLImageElement;
    readonly #tempParagraph: HTMLParagraphElement;
    readonly #windParagraph: HTMLParagraphElement;
    readonly #humidityParagraph: HTMLParagraphElement;

    public constructor( htmlSectionElement: NonNullable<HTMLElement>,
                        date: NonNullable<string>,
                        icon: NonNullable<string | Icon>,
                        temp: NonNullable<number>,
                        windSpeed: NonNullable<number>,
                        humidity: NonNullable<number> )
    {
        if (htmlSectionElement === undefined || htmlSectionElement === null)
        {
            throw new TypeError(`${new.target.name}: ${htmlSectionElement} HTML section element.`);
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

        this.#htmlSectionElement = htmlSectionElement;
        this.#date = date;
        this.#icon = typeof icon === "string" ? {src: icon, alt: DEFAULT_ICON_ALT} : icon;
        this.#temp = temp;
        this.#windSpeed = windSpeed;
        this.#humidity = humidity;

        this.#dateTitle = this.#htmlSectionElement.querySelector("h5")!;
        this.#weatherConditionImg = this.#htmlSectionElement.querySelector("img")!;

        const paragraphs = this.#htmlSectionElement.querySelectorAll("p");

        this.#tempParagraph = paragraphs.item(0);
        this.#windParagraph = paragraphs.item(1);
        this.#humidityParagraph = paragraphs.item(2);

        this.#dateTitle.textContent = this.#date;

        this.#weatherConditionImg.src = this.#icon.src;
        this.#weatherConditionImg.alt = this.#icon.alt;

        this.#tempParagraph.textContent = `Temp: ${this.#temp} °F`;
        this.#windParagraph.textContent = `Wind: ${this.#windSpeed} MPH`;
        this.#humidityParagraph.textContent = `Humidity: ${this.#humidity} %`;
    }

    public date(date: string): WeatherForecastCard
    {
        this.#date = date;
        this.#dateTitle.textContent = this.#date;
        return this;
    }

    public icon(icon: string | Icon): WeatherForecastCard
    {
        this.#icon = typeof icon === "string" ? {src: icon, alt: DEFAULT_ICON_ALT} : icon;
        this.#weatherConditionImg.src = this.#icon.src;
        this.#weatherConditionImg.alt = this.#icon.alt;
        return this;
    }

    public temp(temp: number): WeatherForecastCard
    {
        this.#temp = temp;
        this.#tempParagraph.textContent = `Temp: ${this.#temp} °F`;
        return this;
    }

    public windSpeed(windSpeed: number): WeatherForecastCard
    {
        this.#windSpeed = windSpeed;
        this.#windParagraph.textContent = `Wind: ${this.#windSpeed} MPH`;
        return this;
    }

    public humidity(humidity: number): WeatherForecastCard
    {
        this.#humidity = humidity;
        this.#humidityParagraph.textContent = `Humidity: ${this.#humidity} %`;
        return this;
    }
}

export function weatherForecastCard( htmlElement: HTMLElement | null,
                                     date: string,
                                     icon: string | Icon,
                                     temp: number,
                                     windSpeed: number,
                                     humidity: number ): WeatherForecastCard
{
    if (htmlElement === undefined || htmlElement === null)
    {
    throw new TypeError(`${weatherForecastCard.name}: ${htmlElement} HTML element.`);
    }

return new WeatherForecastCard(htmlElement, date, icon, temp, windSpeed, humidity);
}

export default weatherForecastCard;
