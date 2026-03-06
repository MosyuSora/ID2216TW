# TW2.3 Suspense (Native) 解析文档

## 问题内容
在移动端应用中，异步数据抓取（Fetch）需要一定的时间。为了提升用户体验（UX），必须实现“加载中”、“错误提示”以及“无数据”状态的优雅切换。
1. **SuspenseView**：编写一个通用的 React Native 占位组件，处理加载动画、错误信息和空状态。
2. **状态分发**：在 `DetailsPresenter` 和 `SearchPresenter` 中集成 `PromiseState` 逻辑，根据异步状态自动切换显示。

## 问题 Scope
- **通用视图**: [`/src/native-views/suspenseView.jsx` (Line 1-42)](https://github.com/MosyuSora/ID2216TW/blob/main/src/native-views/suspenseView.jsx#L1-L42)
- **详情控制**: [`/src/reactjs/detailsPresenter.jsx` (Line 1-35)](https://github.com/MosyuSora/ID2216TW/blob/main/src/reactjs/detailsPresenter.jsx#L1-L35)
- **搜索控制**: [`/src/reactjs/searchPresenter.jsx` (Line 1-46)](https://github.com/MosyuSora/ID2216TW/blob/main/src/reactjs/searchPresenter.jsx#L1-L46)

## 对应知识点回顾
- [07_suspense.md](../../id2216_tutorials/07_suspense.md): 介绍了声明式处理加载状态的 `Suspense` 概念，以及在项目中通过 `PromiseState` 模式（promise, data, error）手动实现 UI 状态机的方法。
- **Conditional Rendering (三元运算符)**: 在 JSX 中根据状态切换视图，如 `ps.data ? <Result /> : <Suspense />`。

## 解题思路
1. **SuspenseView 组件设计**:
   - 严格按照测试脚本对 React Native 组件的检索逻辑编写。
   - 优先级：`!promise` (no data) > `!data && !error` (Loading GIF) > `error` (Error Message) > `data` (null)。
   - 使用 `props.error.toString()` 确保错误信息能被测试正则表达式匹配。

2. **Presenter 层响应式逻辑**:
   - 通过 MobX `observer` 监听 Model 中的 `promiseState`。
   - 在 `SearchPresenter` 中，搜索表单 `SearchFormView` 必须独立于结果显示，确保搜索操作始终可用。
   - 在 `DetailsPresenter` 中，如果数据未就绪，则整体“挂起”显示 `SuspenseView`。

### 最终代码实现 (核心片段)

#### /src/native-views/suspenseView.jsx
```javascript
import React from 'react';
import { View, Text, Image } from 'react-native';

function SuspenseView({ promise, data, error }) {
    if (!promise) return <View><Text>no data</Text></View>;
    if (!data && !error) return (
        <View><Image source={{ uri: "https://brfenergi.se/iprog/loading.gif" }} style={{ width: 50, height: 50 }}/></View>
    );
    if (error) return <View><Text>{error.toString()}</Text></View>;
    return null;
}
export { SuspenseView };
```

#### /src/reactjs/searchPresenter.jsx
```javascript
const Search = observer(function Search({ model }) {
    const ps = model.searchResultsPromiseState;
    const form = <SearchFormView ... />; // 始终显示
    const result = ps.data ? 
        <SearchResultsView searchResults={ps.data} ... /> : 
        <SuspenseView promise={ps.promise} data={ps.data} error={ps.error} />;
    
    return <>{form}{result}</>;
});
```


## 参考链接
- [Canvas 章节: TW2.3.1](https://canvas.kth.se/courses/59201/modules/items/1401005)


---

⬅️ [上一章: TW2.2](./TW2.2_Resolving_promises_in_Application_State_and_Side_effects.md) | [🏠 回到首页](../../README.md) | [下一章: TW2.4](./TW2.4_Rendering_and_fire_custom_events_in_Views.md) ➡️
