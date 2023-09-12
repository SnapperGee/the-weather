export const DEFAULT_ICON_ALT: string = "weather condition icon";

export interface Icon {src: string, alt: string};

export const formatDateString = (aString: string): string => {
    const shortenedString = aString.substring(0, aString.indexOf("\u0020"));

    const splitString = shortenedString.split("-");

    const year = splitString[0];

    const month = splitString[1];

    const day = splitString[2];

    return `${month}/${day}/${year}`
};

export const convertKelvinToFahrenheit = (aNumber: number): number => {
    const fahrenheit = (aNumber - 273.15) * (9/5) + 32;
    return Math.round((fahrenheit + Number.EPSILON) * 100) / 100;
}

export const convertKelvinToCelsius = (aNumber: number): number => {
    const celsius = aNumber - 273.15;
    return Math.round((celsius + Number.EPSILON) * 100) / 100;
}

export const createOpenWeatherMapIconSrc = (aString: string): string => `https://openweathermap.org/img/w/${aString}.png`;
