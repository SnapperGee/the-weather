const DEFAULT_ICON_ALT: string = "weather condition icon";

export type Icon = {src: string, alt: string};

export abstract class WeatherCard
{
    readonly #htmlSectionElement: HTMLElement;
    readonly #htmlImageElement: HTMLImageElement;

    #date: string;
    #icon: Icon;
    #temp: number;
    #windSpeed: number;
    #humidity: number;

    public constructor( htmlSectionElement: NonNullable<HTMLElement>,
                        date: NonNullable<string>,
                        icon: NonNullable<string | Icon>,
                        temp: NonNullable<number>,
                        windSpeed: NonNullable<number>,
                        humidity: NonNullable<number>,
                        htmlImageElement: NonNullable<HTMLImageElement> )
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

        if (htmlImageElement === undefined || htmlImageElement === null)
        {
            throw new TypeError(`${new.target.name}: ${htmlImageElement} HTML image element.`);
        }

        this.#htmlSectionElement = htmlSectionElement;
        this.#date = date;
        this.#icon = typeof icon === "string" ? {src: icon, alt: DEFAULT_ICON_ALT} : icon;
        this.#temp = temp;
        this.#windSpeed = windSpeed;
        this.#humidity = humidity;
        this.#htmlImageElement = htmlImageElement;
        this.#htmlImageElement.src = this.#icon.src;
        this.#htmlImageElement.alt = this.#icon.alt;
    }

    public get htmlSectionElement(): HTMLElement { return this.#htmlSectionElement; }

    public get htmlImageElement(): HTMLImageElement { return this.#htmlImageElement; }

    public icon(icon: string | Icon): this
    {
        this.#icon = typeof icon === "string" ? {src: icon, alt: DEFAULT_ICON_ALT} : icon;
        this.#htmlImageElement.src = this.#icon.src;
        this.#htmlImageElement.alt = this.#icon.alt;
        return this;
    }

    protected set _date(date: NonNullable<string>)
    {
        if (date === undefined || date === null)
        {
            throw new TypeError(`${arguments.callee.name}: ${date} date string.`);
        }

        this.#date = date;
    }

    protected set _icon(icon: NonNullable<string | Icon>)
    {
        if (icon === undefined || icon === null)
        {
            throw new TypeError(`${arguments.callee.name}: ${icon} icon.`);
        }

        this.#icon = typeof icon === "string" ? {src: icon, alt: DEFAULT_ICON_ALT} : icon;
    }

    protected set _temp(temp: NonNullable<number>)
    {
        if (temp === undefined || temp === null)
        {
            throw new TypeError(`${arguments.callee.name}: ${temp} temp number.`);
        }

        this.#temp = temp;
    }

    protected set _windSpeed(windSpeed: NonNullable<number>)
    {
        if (windSpeed === undefined || windSpeed === null)
        {
            throw new TypeError(`${arguments.callee.name}: ${windSpeed} wind speed number.`);
        }

        this.#windSpeed = windSpeed;
    }

    protected set _humidity(humidity: NonNullable<number>)
    {
        if (humidity === undefined || humidity === null)
        {
            throw new TypeError(`${arguments.callee.name}: ${humidity} humidity number.`);
        }

        this.#humidity = humidity;
    }

    public abstract date(date: string): WeatherCard;

    public abstract temp(temp: number): WeatherCard;

    public abstract wind(windSpeed: number): WeatherCard;

    public abstract humidity(humidity: number): WeatherCard;

    public show(): this
    {
        this.#htmlSectionElement.style.display = "block";
        return this;
    }

    public hide(): this
    {
        this.#htmlSectionElement.style.display = "none";
        return this;
    }
}
