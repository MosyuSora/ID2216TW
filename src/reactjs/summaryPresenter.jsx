import React from "react";
import SummaryView from "../views/summaryView.jsx";
import { observer } from "mobx-react-lite";
import { shoppingList } from "../utilities.js";

const Summary = observer(function Summary(props) {
  return (
    <SummaryView
      people={props.model.numberOfGuests}
      ingredients={shoppingList(props.model.dishes)}
    />
  );
});

export { Summary };
