import { DEFAULT_ICON_ALT, type Icon } from "./util";

export class WeatherDayCard
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

    public constructor( htmlSectionElement: NonNullable<HTMLElement>,
                        cityName: NonNullable<string>,
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

        this.#htmlSectionElement = htmlSectionElement;
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

    public cityName(cityName: NonNullable<string>): WeatherDayCard
    {
        if (cityName === undefined || cityName === null)
        {
            throw new TypeError(`${this.cityName.name}: ${cityName} city name string.`);
        }

        this.#cityName = cityName;
        this.#cityNameAndDateTitle.textContent = `${this.#cityName} (${this.#date})`;
        return this;
    }

    public date(date: NonNullable<string>): WeatherDayCard
    {
        if (date === undefined || date === null)
        {
            throw new TypeError(`${this.date.name}: ${date} date string.`);
        }

        this.#date = date;
        this.#cityNameAndDateTitle.textContent = `${this.#cityName} (${this.#date})`;
        return this;
    }

    public icon(icon: NonNullable<string | Icon>): WeatherDayCard
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

    public temp(temp: NonNullable<number>): WeatherDayCard
    {
        if (temp === undefined || temp === null)
        {
            throw new TypeError(`${this.temp.name}: ${temp} number.`);
        }

        this.#temp = temp;
        this.#tempParagraph.textContent = `Temp: ${this.#temp} °F`;
        return this;
    }

    public windSpeed(windSpeed: NonNullable<number>): WeatherDayCard
    {
        if (windSpeed === undefined || windSpeed === null)
        {
            throw new TypeError(`${this.windSpeed.name}: ${windSpeed} wind speed number.`);
        }

        this.#windSpeed = windSpeed;
        this.#windParagraph.textContent = `Wind: ${this.#windSpeed} MPH`;
        return this;
    }

    public humidity(humidity: NonNullable<number>): WeatherDayCard
    {
        if (humidity === undefined || humidity === null)
        {
            throw new TypeError(`${this.humidity.name}: ${humidity} humidity number.`);
        }
        this.#humidity = humidity;
        this.#humidityParagraph.textContent = `Humidity: ${this.#humidity} %`;
        return this;
    }

    public show(): WeatherDayCard
    {
        this.#htmlSectionElement.style.display = "block";
        return this;
    }

    public hide(): WeatherDayCard
    {
        this.#htmlSectionElement.style.display = "none";
        return this;
    }
}

export function weatherDayCard( htmlElement: HTMLElement | null,
                                cityName: string,
                                date: string,
                                icon: string | Icon,
                                temp: number,
                                windSpeed: number,
                                humidity: number ): WeatherDayCard
{
    if (htmlElement === undefined || htmlElement === null)
    {
        throw new TypeError(`${weatherDayCard.name}: ${htmlElement} HTML element.`);
    }

    return new WeatherDayCard(htmlElement, cityName, date, icon, temp, windSpeed, humidity);
}

export default weatherDayCard;
