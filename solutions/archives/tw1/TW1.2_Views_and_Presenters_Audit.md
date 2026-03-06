# TW1.2 Views and Presenters 审计记录

## 1. TW 1.2.1 Bootstrapping the App (Native)

### 问题内容
- 在 `/src/mobxReactiveModel.js` 中设置响应式模型（Reactive Model）。
- 在 `/src/app/index.jsx` 中将响应式模型作为 prop 传递给 Presenter（Summary）。

### 问题 Scope
- [src/mobxReactiveModel.js](../../src/mobxReactiveModel.js)
- [src/app/index.jsx](../../src/app/index.jsx)

### 对应知识点回顾
- [04_mvp_intro.md](../../id2216_tutorials/04_mvp_intro.md)
- [05_reactivity.md](../../id2216_tutorials/05_reactivity.md)

### 解题思路
- **响应式模型设置**:
  使用 `observable()` 函数（来自 MobX）将普通的 `DinnerModel` 实例包装成响应式对象。这是 MVP 模式中 Model 层能够通知外部变化的基础。
- **代码实现**:
```javascript
import { observable } from "mobx"; // 引入 MobX 的 observable 函数
import { model } from "/src/DinnerModel"; // 引入原始模型实例

function makeReactiveModel(model) {
    return observable(model); // 将模型对象包装为响应式 observable，使其属性变化可被追踪
}

const reactiveModel = makeReactiveModel(model); // 创建全局唯一的响应式模型实例
export { makeReactiveModel, reactiveModel }; // 导出供应用其他部分使用
```

---

## 2. TW 1.2.2 Presenters pass props to Views. Root component (Native)

### 问题内容
- 在 `summaryPresenter.jsx` 中从 `props.model` 读取数据并传递 `people` 和 `ingredients` 给 `SummaryView`。
- 创建 `sidebarPresenter.jsx`，从 `model` 读取 `numberOfGuests` 和 `dishes` 传递给 `SidebarView`。

### 问题 Scope
- [src/reactjs/summaryPresenter.jsx](../../src/reactjs/summaryPresenter.jsx)
- [src/reactjs/sidebarPresenter.jsx](../../src/reactjs/sidebarPresenter.jsx)

### 对应知识点回顾
- [04_mvp_intro.md](../../id2216_tutorials/04_mvp_intro.md)
- [03_rendering.md](../../id2216_tutorials/03_rendering.md)

### 解题思路
- **Presenter 逻辑**:
  Presenter 必须被 `observer` 包裹以响应 Model 的变化。它从 `props.model` 中解构或计算出 View 所需的最小数据，并作为 props 下传。
- **代码实现 (SummaryPresenter)**:
```javascript
import { SummaryView } from "/src/views/summaryView.jsx"; // 引入对应的 View
import { observer } from "mobx-react-lite"; // 引入 observer 使组件响应式
import { shoppingList } from "/src/utilities"; // 引入工具函数计算食材清单

const Summary = observer(function (props) {
    return (
        <SummaryView
            people={props.model.numberOfGuests} // 从模型读取人数并传给 View
            ingredients={shoppingList(props.model.dishes)} // 计算食材清单并传给 View
        />
    );
});

export { Summary };
```

---

## 3. TW 1.2.3 Basic Rendering in Views (Native)

### 问题内容
- 在 `SidebarView.jsx` 中实现基础 UI：显示人数的 Text，以及两个分别带有 `-` 和 `+` 文本的 Pressable。
- 实现逻辑：当人数为 1 时，减号按钮禁用。

### 问题 Scope
- [src/native-views/sidebarView.jsx](../../src/native-views/sidebarView.jsx)

### 对应知识点回顾
- [03_rendering.md](../../id2216_tutorials/03_rendering.md)

### 解题思路
- **UI 逻辑**:
  使用 `Pressable` 替代 Web 的 `button`。通过 `disabled` 属性控制交互逻辑，通过三元运算符处理单复数。
- **代码实现**:
```javascript
export function SidebarView(props) {
    // 减少人数的回调
    function minusACB() { props.onNumberChange(props.number - 1); }
    // 增加人数的回调
    function plusACB() { props.onNumberChange(props.number + 1); }

    return (
        <View style={styles.container}>
            <View style={styles.controls}>
                {/* 减号按钮：当人数 <= 1 时禁用 */}
                <Pressable role="button" disabled={props.number <= 1} onPress={minusACB}>
                    <Text>-</Text>
                </Pressable>
                {/* 显示人数，处理 Guest/Guests 复数逻辑 */}
                <Text>{props.number} {props.number > 1 ? 'Guests' : 'Guest'}</Text>
                {/* 加号按钮 */}
                <Pressable role="button" onPress={plusACB}>
                    <Text>+</Text>
                </Pressable>
            </View>
            {/* ... 其余渲染逻辑 ... */}
        </View>
    );
}
```
