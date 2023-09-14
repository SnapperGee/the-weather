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
        _searchHistoryButtonList = document.getElementById("citySearchHistoryList") as HTMLUListElement;

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
