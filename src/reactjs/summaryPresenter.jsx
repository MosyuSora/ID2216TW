// Note: even if the views are under /src/native-views, Presenters always import from /src/views
// In this way, Presenters are identical for the React (web) and React Native dinner planner apps
// The /src/views -> /src/native-views alias is configured in babel.config.js
import { SummaryView } from "/src/views/summaryView.jsx";
import { observer } from "mobx-react-lite";
import { shoppingList } from "/src/utilities"; // 导入购物清单聚合工具

const Summary = observer(
function (props){
    return (
        <SummaryView
      people={props.model.numberOfGuests} // 将 Model 中的人数映射到 View 的 people prop
      ingredients={
        shoppingList(props.model.dishes) // 将 Model 中的菜单经过聚合处理后传给 View
      }
    />
    )
});

export { Summary }
