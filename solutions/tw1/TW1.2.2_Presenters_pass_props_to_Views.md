# TW1.2.2 Presenters pass props to Views

### 问题内容
本节要求实现 `Summary` 和 `Sidebar` 两个 Presenter。Presenter 作为 Model 和 View 之间的桥梁，需要从 `props.model` 中提取所需的数据，并将其作为 props 传递给对应的 View 组件。
- `Summary` Presenter 需向 `SummaryView` 传递 `people` (人数) 和 `ingredients` (食材清单)。
- `Sidebar` Presenter 需向 `SidebarView` 传递 `number` (人数) 和 `dishes` (已点菜品)。
- 在 React 环境下，Presenter 必须使用 `observer` 以响应 Model 的变化。

### 问题 Scope
- [summaryPresenter.jsx](../../src/reactjs/summaryPresenter.jsx)
- [sidebarPresenter.jsx](../../src/reactjs/sidebarPresenter.jsx)

### 对应知识点回顾
- [04_mvp_intro.md](../../id2216_tutorials/04_mvp_intro.md): MVP 架构分工。
- [05_reactivity.md](../../id2216_tutorials/05_reactivity.md): MobX 响应式原理与 `observer`。
- [Canvas: JSX (JavaScript XML)](https://canvas.kth.se/courses/59201/pages/jsx-javascript-xml-tw1-dot-2-1-dot-5-tw2-dot-2-2-dot-4): JSX 渲染与 Prop 传递。

### 解题思路
1. **架构设计**：遵循 MVP 模式，View 不直接接触 Model。Presenter 接收 `model` 作为 prop。
2. **数据处理**：
   - 使用 `props.model.numberOfGuests` 获取人数。
   - `Summary` 需调用 `shoppingList(props.model.dishes)` 计算汇总食材。
3. **响应式绑定**：使用 `mobx-react-lite` 的 `observer` 高阶组件包裹 Presenter 函数，确保 Model 更新时 UI 自动重绘。
4. **具名导出**：为了匹配自动化测试脚本，必须使用具名导出 `export { Summary }` 和 `export { Sidebar }`。

#### summaryPresenter.jsx 实现
```jsx
import React from "react";
import { SummaryView } from "../native-views/summaryView"; // 导入 View
import { observer } from "mobx-react-lite"; // 导入响应式支持
import { shoppingList } from "../utilities.js"; // 导入工具函数

// 使用 observer 包裹，使其能够响应 model 的变化
const Summary = observer(function Summary(props) {
  return (
    <SummaryView
      // 从 model 中提取数据并传给 View
      people={props.model.numberOfGuests}
      // 计算食材清单并传递
      ingredients={shoppingList(props.model.dishes)}
    />
  );
});

export { Summary }; // 具名导出以供测试
```

#### sidebarPresenter.jsx 实现
```jsx
import React from "react";
import { SidebarView } from "../native-views/sidebarView"; // 导入 View
import { observer } from "mobx-react-lite"; // 导入响应式支持

// 使用 observer 包裹
const Sidebar = observer(function Sidebar(props) {
  return (
    <SidebarView
      // 提取人数
      number={props.model.numberOfGuests}
      // 提取菜品数组
      dishes={props.model.dishes}
    />
  );
});

export { Sidebar }; // 具名导出
```


## 参考链接
- [Canvas 章节: TW1.2.2](https://canvas.kth.se/courses/59201/modules/items/1360854)
