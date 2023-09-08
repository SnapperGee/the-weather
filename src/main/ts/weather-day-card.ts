const DEFAULT_ICON_ALT: string = "weather condition icon";

type Icon = {src: string, alt: string};

export class WeatherDayCard
{
    readonly #htmlSectionElement: HTMLElement;
    #cityName: string;
    #date: string;

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

        this.#cityNameAndDateTitle = this.#htmlSectionElement.querySelector("h2")!;
        this.#weatherConditionImg = this.#htmlSectionElement.querySelector("img")!;

        const paragraphs = this.#htmlSectionElement.querySelectorAll("p");

        this.#tempParagraph = paragraphs.item(0);
        this.#windParagraph = paragraphs.item(1);
        this.#humidityParagraph = paragraphs.item(2);

        this.#cityNameAndDateTitle.textContent = `${this.#cityName} (${this.#date})`;

        this.#weatherConditionImg.src = typeof icon === "string" ? icon : icon.src;
        this.#weatherConditionImg.alt = typeof icon === "string" ? DEFAULT_ICON_ALT : icon.alt;

        this.#tempParagraph.textContent = `Temp: ${temp} °F`;
        this.#windParagraph.textContent = `Wind: ${windSpeed} MPH`;
        this.#humidityParagraph.textContent = `Humidity: ${humidity} %`;
    }

    public cityName(cityName: string): WeatherDayCard
    {
        this.#cityName = cityName;
        this.#cityNameAndDateTitle.textContent = `${this.#cityName} (${this.#date})`;
        return this;
    }

    public date(date: string): WeatherDayCard
    {
        this.#date = date;
        this.#cityNameAndDateTitle.textContent = `${this.#cityName} (${this.#date})`;
        return this;
    }

    public icon(icon: string | Icon): WeatherDayCard
    {
        this.#weatherConditionImg.src = typeof icon === "string" ? icon : icon.src;
        this.#weatherConditionImg.alt = typeof icon === "string" ? DEFAULT_ICON_ALT : icon.alt;
        return this;
    }

    public temp(temp: number): WeatherDayCard
    {
        this.#tempParagraph.textContent = `Temp: ${temp} °F`;
        return this;
    }

    public wind(windSpeed: number): WeatherDayCard
    {
        this.#windParagraph.textContent = `Wind: ${windSpeed} MPH`;
        return this;
    }

    public humidity(humidity: number): WeatherDayCard
    {
        this.#humidityParagraph.textContent = `Humidity: ${humidity} %`;
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

export function weatherDayCard( htmlSectionElement: HTMLElement | null,
                                cityName: string,
                                date: string,
                                icon: string | Icon,
                                temp: number,
                                windSpeed: number,
                                humidity: number ): WeatherDayCard
{
    if (htmlSectionElement === undefined || htmlSectionElement === null)
    {
        throw new TypeError(`${arguments.callee.name}: ${htmlSectionElement} HTML section element.`);
    }

    return new WeatherDayCard(htmlSectionElement, cityName, date, icon, temp, windSpeed, humidity);
}

export default weatherDayCard;
