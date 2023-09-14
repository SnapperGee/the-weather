const searchHistoryButtonClasses: readonly string[] = Object.freeze([
    "btn", "btn-secondary", "list-group-item-action", "w-100"
]);

/**
 * Creates an `HTMLLIElement` containing an `HTMLButtonElement` child.
 *
 * @param text The text content of the child `HTMLButtonElement` child.
 *
 * @returns An `HTMLLIElement` containing an `HTMLButtonElement` child.
 */
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
