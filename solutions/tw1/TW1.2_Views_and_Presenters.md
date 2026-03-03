# TW1.2 Views and Presenters

本章节介绍了 MVP (Model-View-Presenter) 架构在 React Native / Expo 环境下的具体实现，重点在于应用的引导 (Bootstrapping)、组件间的 Prop 传递以及基础渲染逻辑。

---

## TW1.2.1 App Bootstrapping

### 问题内容
在 Expo Router 架构下，实现应用顶层对 Model 的初始化与注入：
1. 在应用的入口页面（`src/app/index.jsx`）中导入应用唯一的 `model` 实例。
2. 将该 `model` 实例作为 `props` 传递给顶层的 Presenter 组件（如 `Summary`）。

### 问题 Scope
- 代码文件：[`/src/app/index.jsx`](../../src/app/index.jsx)
- 修改行号：第 1-15 行。

### 对应知识点回顾
- **MVP 架构引导**：在应用启动时，必须确保有一个全局唯一的 Model 实例。
- **Prop 传递**：React 组件通过 `props` 接收外部传入的数据或对象。
- **Expo Router 入口**：`src/app/index.jsx` 是 Expo 项目的默认首屏。
- 参考教程：[`/id2216_tutorials/04_mvp_intro.md`](../../id2216_tutorials/04_mvp_intro.md)

### 解题思路
1. **单例模式**: 根据课程规范，Model 应该作为一个单例存在。我们在 `index.jsx` 这一“顶层容器”中导入它。
2. **顶层注入**: 为了让下层组件（Presenter 和 View）能够访问到数据，我们需要利用 React 的 Prop 机制，将 `model` 实例手动向下传递。
3. **响应式预留**: 虽然此时 `model` 还是普通 JS 对象，但这种“顶层持有”的模式为后续接入 `Observer` 模式打下了基础。

#### 最终实现代码

```javascript
import { ScrollView, View } from "react-native"
import { Summary } from "/src/reactjs/summaryPresenter"
import { model } from "/src/DinnerModel" // 1. 导入应用唯一的 Model 实例

export default function IndexPage() {
  return (
    <ScrollView>
      <View>
        {/* 2. 将 model 作为 prop 传递给 Summary Presenter */}
        <Summary model={model} /> 
      </View>
    </ScrollView>
  )
}
```

---

## TW1.2.2 Presenter Mapping & Prop Passing

### 问题内容
在 `summaryPresenter.jsx` 中实现从 Model 到 View 的数据映射逻辑：
1. 导入 `shoppingList` 工具函数。
2. 将 `props.model.numberOfGuests` 映射为 `SummaryView` 的 `people` prop。
3. 将 `props.model.dishes` 经过 `shoppingList` 转换后映射为 `ingredients` prop。

### 问题 Scope
- 代码文件 1：[`/src/reactjs/summaryPresenter.jsx`](../../src/reactjs/summaryPresenter.jsx) (修改行号：第 5-18 行)
- 代码文件 2：[`/src/mobxReactiveModel.js`](../../src/mobxReactiveModel.js) (配置响应式单例)

### 对应知识点回顾
- **Presenter 的职责**：作为 Model 与 View 之间的“翻译官”。它不包含 UI 逻辑，只负责提取数据并将其转换为 View 期望的格式。
- **MobX Reactivity**：使用 `observable(model)` 使数据具备响应式能力。当 Model 变化时，被 `observer` 包裹的 Presenter 会自动重绘。
- **逻辑解耦**：Presenter 负责调用 `shoppingList` 聚合数据，View 只需要傻瓜式地显示 `ingredients` 数组。
- 参考教程：[`/id2216_tutorials/04_mvp_intro.md`](../../id2216_tutorials/04_mvp_intro.md)

### 解题思路
1. **响应式升级**: 原始的 `DinnerModel` 只是一个普通的 JS 对象。在 React Native 环境中，为了实现自动更新，必须通过 `mobx` 的 `observable` 封装。
2. **数据规约**: View 需要的是“配料清单”，而 Model 存储的是“菜品列表”。Presenter 在这一步通过调用 `shoppingList` 完成了数据的**归约 (Reduction)**。

#### 最终实现代码

**src/reactjs/summaryPresenter.jsx**
```javascript
import { SummaryView } from "/src/views/summaryView.jsx";
import { observer } from "mobx-react-lite";
import { shoppingList } from "/src/utilities"; // 1. 导入聚合工具

const Summary = observer(function (props){
    return (
        <SummaryView
            // 2. 映射人数属性
            people={props.model.numberOfGuests} 
            // 3. 映射聚合后的配料清单
            ingredients={shoppingList(props.model.dishes)} 
        />
    )
});
```

---

## TW1.2.3 Basic Rendering in Views

### 问题内容
在 `summaryView.jsx` 中利用 JSX 表达式实现基础数据渲染：
1. 使用 `{props.people}` 表达式在 UI 中显示用餐人数。

### 问题 Scope
- 代码文件：[`/src/native-views/summaryView.jsx`](../../src/native-views/summaryView.jsx)
- 修改行号：第 9-13 行。

### 对应知识点回顾
- **JSX 数据绑定**：在大括号 `{}` 中书写 JavaScript 表达式，React 会自动将其计算结果渲染到 UI。
- **Native 文本包裹**：在 React Native 中，所有裸字符串必须放在 `<Text>` 组件内，否则会导致程序崩溃。
- **Props 驱动 UI**：View 组件是被动的，其显示内容完全取决于接收到的 `props`。
- 参考教程：[`/id2216_tutorials/03_rendering.md`](../../id2216_tutorials/03_rendering.md)

### 解题思路
由于 `SummaryView` 已经在上一个子任务中从 Presenter 接收到了 `people` 属性，我们在 View 中只需要将这个变量“投影”到界面的相应位置即可。

#### 最终实现代码

```javascript
export function SummaryView(props) {
  return (
    <View style={styles.container}>
      <Text>
        {/* 使用大括号表达式插入动态数据 */}
        Summary for <Text>{props.people}</Text> persons:
      </Text>
      {/* 列表渲染部分将在 TW 1.3 中实现 */}
    </View>
  )
}
```


