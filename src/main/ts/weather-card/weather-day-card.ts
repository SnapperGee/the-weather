import { WeatherCard, type Icon } from "../weather-card";

export class WeatherDayCard extends WeatherCard
{
    #cityName: string;

    readonly #cityNameAndDateTitle: HTMLHeadingElement;
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
        super(htmlSectionElement, date, icon, temp, windSpeed, humidity, htmlSectionElement.querySelector("img")!);

        if (cityName === undefined || cityName === null)
        {
            throw new TypeError(`${new.target.name}: ${cityName} city name string.`);
        }

        this.#cityName = cityName;

        this.#cityNameAndDateTitle = this.htmlSectionElement.querySelector("h2")!;

        const paragraphs = this.htmlSectionElement.querySelectorAll("p");

        this.#tempParagraph = paragraphs.item(0);
        this.#windParagraph = paragraphs.item(1);
        this.#humidityParagraph = paragraphs.item(2);

        this.#cityNameAndDateTitle.textContent = `${this.#cityName} (${super._date})`;

        this.#tempParagraph.textContent = `Temp: ${super._temp} °F`;
        this.#windParagraph.textContent = `Wind: ${super._windSpeed} MPH`;
        this.#humidityParagraph.textContent = `Humidity: ${super._humidity} %`;
    }

    public cityName(cityName: NonNullable<string>): WeatherDayCard
    {
        if (cityName === undefined || cityName === null)
        {
            throw new TypeError(`${arguments.callee.name}: ${cityName} city name string.`);
        }

        this.#cityName = cityName;
        this.#cityNameAndDateTitle.textContent = `${this.#cityName} (${super._date})`;
        return this;
    }

    public override date(date: NonNullable<string>): WeatherDayCard
    {
        if (date === undefined || date === null)
        {
            throw new TypeError(`${arguments.callee.name}: ${date} date number.`);
        }

        super._date = date;
        this.#cityNameAndDateTitle.textContent = `${this.#cityName} (${super._date})`;
        return this;
    }

    public override temp(temp: NonNullable<number>): WeatherDayCard
    {
        if (temp === undefined || temp === null)
        {
            throw new TypeError(`${arguments.callee.name}: ${temp} temp number.`);
        }

        super._temp = temp;
        this.#tempParagraph.textContent = `Temp: ${super._temp} °F`;
        return this;
    }

    public override wind(windSpeed: NonNullable<number>): WeatherDayCard
    {
        if (windSpeed === undefined || windSpeed === null)
        {
            throw new TypeError(`${arguments.callee.name}: ${windSpeed} wind speed number.`);
        }

        super._windSpeed = windSpeed;
        this.#windParagraph.textContent = `Wind: ${super._windSpeed} MPH`;
        return this;
    }

    public override humidity(humidity: NonNullable<number>): WeatherDayCard
    {
        if (humidity === undefined || humidity === null)
        {
            throw new TypeError(`${arguments.callee.name}: ${humidity} humidity number.`);
        }

        super._humidity = humidity;
        this.#humidityParagraph.textContent = `Humidity: ${super._humidity} %`;
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
