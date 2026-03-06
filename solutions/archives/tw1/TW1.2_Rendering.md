# TW1.2 Rendering

## TW1.2.1 Bootstrapping the App (Native)

### 问题内容
在 Expo (Native) 环境下初始化应用，设置 React 根节点。

### 问题 Scope
- [src/app/index.jsx](../../src/app/index.jsx)

### 对应知识点回顾
- [01_setup.md](../../id2216_tutorials/01_setup.md)
- [03_rendering.md](../../id2216_tutorials/03_rendering.md)

### 解题思路
通过在 `src/app/index.jsx` 中导出默认组件，React Navigation (Expo Router) 会将其识别为首页。我们在此处渲染 `Sidebar` Presenter，并将全局的 `reactiveModel` 作为 prop 传入，从而建立 MVP 架构。

---

## TW1.2.2 Presenters pass props to Views (Native)

### 问题内容
实现 Presenters (Sidebar & Summary) 将数据从 Model 传递给 View 的逻辑。

### 问题 Scope
- [src/reactjs/sidebarPresenter.jsx](../../src/reactjs/sidebarPresenter.jsx)
- [src/reactjs/summaryPresenter.jsx](../../src/reactjs/summaryPresenter.jsx)

### 对应知识点回顾
- [04_mvp_intro.md](../../id2216_tutorials/04_mvp_intro.md)

### 解题思路
在 MVP 模式中，Presenter 负责：
1. 从 `props.model` 中读取状态（如 `numberOfGuests`, `dishes`）。
2. 将状态映射为 View 所需的简单 props。
3. 实现动作回调（ACB），将 View 触发的事件（如 `onNumberChange`）转发给 Model。
4. 使用 `observer` 包裹组件，使 Model 数据变化时自动触发重绘。

#### 代码实现 (sidebarPresenter.jsx)
```javascript
import React from "react";
import { SidebarView } from "../views/sidebarView.jsx";
import { observer } from "mobx-react-lite";

const Sidebar = observer(
function (props) {
    // 处理人数变更：View -> Presenter -> Model
    function numberChangeACB(newNumber) {
        props.model.setNumberOfGuests(newNumber);
    }

    // 处理菜品选择：View -> Presenter -> Model
    function dishInterestACB(dish) {
        props.model.setCurrentDishId(dish.id);
    }

    // 处理菜品移除
    function removeDishACB(dish) {
        props.model.removeFromMenu(dish);
    }

    return (
        <SidebarView
            // 传递状态
            number={props.model.numberOfGuests}
            dishes={props.model.dishes}
            // 传递回调
            onNumberChange={numberChangeACB}
            onDishInterest={dishInterestACB}
            onDishRemove={removeDishACB}
        />
    );
});

export { Sidebar };
```

#### 代码实现 (summaryPresenter.jsx)
```javascript
import React from "react";
import { SummaryView } from "/src/views/summaryView.jsx";
import { observer } from "mobx-react-lite";
import { shoppingList } from "/src/utilities";

const Summary = observer(function Summary(props) {
  return (
    <SummaryView
      // 将 Model 数据转化为 View 所需的 shoppingList 数组
      people={props.model.numberOfGuests}
      ingredients={shoppingList(props.model.dishes)}
    />
  );
});

export { Summary };
```
