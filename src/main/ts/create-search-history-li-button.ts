const searchHistoryButtonClasses: readonly string[] = Object.freeze([
    "btn", "btn-secondary", "list-group-item-action", "w-100"
]);

export const createSearchHistoryLIButton = (text: NonNullable<string>): HTMLLIElement =>
{
    const searchHistoryButton = document.createElement("button");
    searchHistoryButton.classList.add(...searchHistoryButtonClasses);
    searchHistoryButton.textContent = text;

    const searchHistoryLI = document.createElement("li");
    searchHistoryLI.appendChild(searchHistoryButton);

    return searchHistoryLI;
}

export default createSearchHistoryLIButton;
