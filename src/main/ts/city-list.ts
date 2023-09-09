import citiesJson from "../resources/current.city.list.json";

type city = Readonly<{id: number, name: string, country: string}>;

const cities: readonly city[] = Object.freeze(citiesJson) as readonly city[];

export function getCity(id: number): city | false;
export function getCity(name: string, country: string): city[];
export function getCity(idOrName: number | string, country?: string): city | false | city[]
{
    if (typeof idOrName === "number")
    {
        return cities.find(city => idOrName === city.id) ?? false;
    }
    else if (typeof idOrName === "string")
    {
        if (country === undefined || country === null)
        {
            throw new TypeError(`${arguments.callee.name}: ${country} country.`);
        }

        return cities.filter(city =>
            idOrName.localeCompare(city.name, undefined, {sensitivity: "base"}) === 0
            && country.localeCompare(city.country, undefined, {sensitivity: "base"}) === 0 );
    }
    else
    {
        throw new TypeError(`${arguments.callee.name}: invalid id or name argument: "${typeof idOrName}".`);
    }
}
