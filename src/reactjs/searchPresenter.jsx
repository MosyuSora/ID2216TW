import React from 'react';
import { observer } from 'mobx-react-lite';
import { SuspenseView } from '../views/suspenseView';
import { SearchResultsView } from '../views/searchResultsView';
import { SearchFormView } from '../views/searchFormView';

/**
 * SearchPresenter - TW2.3 & TW2.5
 * Refined for strict test match (toString() regex).
 */
const Search = observer(function Search(props) {
    const { model } = props;
    if (!model) return null;

    const ps = model.searchResultsPromiseState;

    const form = React.createElement(SearchFormView, {
        text: model.searchParams.query,
        type: model.searchParams.type,
        dishTypeOptions: ['starter', 'main course', 'dessert'],
        onSearchTextChange: function onSearchTextChangeACB(txt){ model.setSearchQuery(txt); },
        onSearchTypeChange: function onSearchTypeChangeACB(type){ model.setSearchType(type); },
        onSearchClick: function onSearchClickACB(){ model.doSearch(model.searchParams); }
    });

    let result = null;
    if (ps?.data) {
        result = React.createElement(SearchResultsView, {
            searchResults: ps.data,
            onDishChosen: function onDishChosenACB(dish){ model.setCurrentDishId(dish.id); }
        });
    } else {
        result = React.createElement(SuspenseView, {
            promise: ps?.promise,
            data: ps?.data,
            error: ps?.error
        });
    }

    return React.createElement(React.Fragment, null, form, result);
});

export { Search };
export default Search;
