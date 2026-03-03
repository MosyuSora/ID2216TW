// Note: even if the views are under /src/native-views, Presenters always import from /src/views
// In this way, Presenters are identical for the React (web) and React Native dinner planner apps
// The /src/views -> /src/native-views alias is configured in babel.config.js
import { SummaryView } from "/src/views/summaryView.jsx";
import { observer } from "mobx-react-lite";

const Summary = observer(
function (props){
    return (
        <SummaryView
      people={"TODO pass the relevant field from props.model"}
      ingredients={
        "TODO call shoppingList imported from utilities, pass the model menu as parameter"
      }
    />
    )
});

export { Summary }
