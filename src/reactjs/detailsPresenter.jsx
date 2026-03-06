import React from 'react';
import { observer } from 'mobx-react-lite';
import { SuspenseView } from '../views/suspenseView';
import { DetailsView } from '../views/detailsView';

/**
 * DetailsPresenter - TW2.3 & TW2.5
 * Refined for strict test match (toString() regex).
 */
function Details(props) {
    const { model } = props;
    const ps = model.currentDishPromiseState;

    if (!ps || !ps.data) {
        return React.createElement(SuspenseView, {
            promise: ps?.promise,
            data: ps?.data,
            error: ps?.error
        });
    }

    function isDishInMenuCB(d) {
        return d.id === ps.data.id;
    }

    return React.createElement(DetailsView, {
        dishData: ps.data,
        isDishInMenu: !!model.dishes.find(isDishInMenuCB),
        guests: model.numberOfGuests,
        onAddToMenu: function onAddToMenuACB(){ model.addToMenu(ps.data); }
    });
}

const ObservedDetails = observer(Details);
export { Details };
export default ObservedDetails;
