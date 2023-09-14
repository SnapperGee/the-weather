/**
 * @module dom
 */

let _rootRow: HTMLDivElement | null = null;

/**
 * Retrieves a reference to the root row DOM `HTMLDivElement`.
 * @returns The root row `HTMLDivElement`.
 */
export function rootRow(): HTMLDivElement
{
    _rootRow = document.getElementById("rootRow") as HTMLDivElement;

    if ( ! (_rootRow instanceof HTMLDivElement))
    {
        throw new TypeError(`${rootRow.name}: ${_rootRow === null ? "null" : "non " + HTMLDivElement.name} root row.`);
    }

    return _rootRow;
}

let _weatherInfoColumn: HTMLDivElement | null = null;

/**
 * Retrieves a reference to the weather info column DOM `HTMLDivElement`.
 * @returns The weather info column `HTMLDivElement`.
 */
export function weatherInfoColumn(): HTMLDivElement
{
    _weatherInfoColumn = document.getElementById("weatherInfoColumn") as HTMLDivElement;

    if ( ! (_weatherInfoColumn instanceof HTMLDivElement))
    {
        throw new TypeError(`${weatherInfoColumn.name}: ${_weatherInfoColumn === null ? "null" : "non " + HTMLDivElement.name} weather info column.`);
    }

    return _weatherInfoColumn;
}

let _weatherDayCard: HTMLDivElement | null = null;

/**
 * Retrieves a reference to the weather day card DOM `HTMLDivElement`.
 * @returns The weather day card `HTMLDivElement`.
 */
export function currentWeatherCard(): HTMLDivElement
{
    _weatherDayCard = document.getElementById("currentWeatherCard") as HTMLDivElement;

    if ( ! (_weatherDayCard instanceof HTMLDivElement))
    {
        throw new TypeError(`${currentWeatherCard.name}: ${_weatherDayCard === null ? "null" : "non " + HTMLDivElement.name} weather day card.`);
    }

    return _weatherDayCard;
}

let _weatherForecastColumns: HTMLCollectionOf<HTMLElement> | null = null;

export const weatherForecastColumns = (): HTMLCollectionOf<HTMLElement> =>
{
    if (_weatherForecastColumns === null)
    {
        _weatherForecastColumns = document.getElementsByClassName("weatherForecastColumn") as HTMLCollectionOf<HTMLElement>;

        if (_weatherForecastColumns.length !== 5)
        {
            throw new Error(`${weatherForecastColumns.name}: expected 5 weather forecast columns, but instead got: ${_weatherForecastColumns.length}`);
        }
    }

    return _weatherForecastColumns;
};

let _searchForm: HTMLFormElement | null = null;

export function searchForm(): HTMLFormElement
{
    if (_searchForm === null)
    {
        _searchForm = document.getElementById("searchForm") as HTMLFormElement;

        if ( ! (_searchForm instanceof HTMLFormElement))
        {
            throw new TypeError(`${searchForm.name}: ${_searchForm === null ? "null" : "non " + HTMLFormElement.name} search form.`);
        }
    }

    return _searchForm;
}

let _searchHistoryButtonList: HTMLUListElement | null = null;

export function searchHistoryButtonList(): HTMLUListElement
{
    if (_searchHistoryButtonList === null)
    {
        _searchHistoryButtonList = document.getElementById("searchHistoryButtonList") as HTMLUListElement;

        if ( ! (_searchHistoryButtonList instanceof HTMLUListElement))
        {
            throw new TypeError(`${searchHistoryButtonList.name}: ${_searchHistoryButtonList === null ? "null" : "non " + HTMLUListElement.name} search history button list.`);
        }
    }

    return _searchHistoryButtonList;
}

let _searchInput: HTMLInputElement | null = null;

export function searchInput(): HTMLInputElement
{
    if (_searchInput === null)
    {
        _searchInput = document.getElementById("searchInput") as HTMLInputElement;

        if ( ! (_searchInput instanceof HTMLInputElement))
        {
            throw new TypeError(`${searchInput.name}: ${_searchInput === null ? "null" : "non " + HTMLInputElement.name} search input.`);
        }
    }

    return _searchInput;
}

let _weatherForecastRow: HTMLDivElement | null = null;

export function weatherForecastRow(): HTMLDivElement
{
    _weatherForecastRow = document.getElementById("weatherForecastRow") as HTMLDivElement;

    if ( ! (_weatherForecastRow instanceof HTMLDivElement))
    {
        throw new TypeError(`${weatherForecastRow.name}: ${_weatherForecastRow === null ? "null" : "non " + HTMLDivElement.name} weather forecast row.`);
    }

    return _weatherForecastRow;
}

export default {
    rootRow: Object.freeze(() => rootRow()),
    weatherInfoColumn: Object.freeze(() => weatherInfoColumn()),
    currentWeatherCard: Object.freeze(() => currentWeatherCard()),
    weatherForecastColumns: Object.freeze((): HTMLCollectionOf<HTMLElement> => weatherForecastColumns()),
    searchForm: Object.freeze((): HTMLFormElement => searchForm()),
    searchHistoryButtonList: Object.freeze(():HTMLUListElement => searchHistoryButtonList()),
    searchInput: Object.freeze((): HTMLInputElement => searchInput()),
    weatherForecastRow: Object.freeze((): HTMLDivElement => weatherForecastRow())
};
