# TW2.4 & TW2.5 Event Handlers - 视图交互与逻辑对接解析

### 问题内容
本章重点在于实现“搜索”与“详情”两大核心功能模块的完整交互链路：
1. **视图层（View）**：利用 Native 组件（TextInput, SegmentedControl, Pressable）渲染界面，并在用户交互时触发“自定义事件”（Custom Events）。
2. **逻辑层（Presenter）**：监听这些自定义事件，将其转化为对 `DinnerModel` 的具体业务操作（如修改搜索参数、添加菜品）。

### 问题 Scope
- **搜索模块**: [`/src/native-views/searchFormView.jsx`](../../src/native-views/searchFormView.jsx), [`/src/native-views/searchResultsView.jsx`](../../src/native-views/searchResultsView.jsx)
- **详情模块**: [`/src/native-views/detailsView.jsx`](../../src/native-views/detailsView.jsx)
- **控制器**: [`/src/reactjs/searchPresenter.jsx`](../../src/reactjs/searchPresenter.jsx), [`/src/reactjs/detailsPresenter.jsx`](../../src/reactjs/detailsPresenter.jsx)

### 对应知识点回顾
- **Props Down / Events Up**: 
  - 父组件（Presenter）通过 props 将**数据**传递给子组件。
  - 子组件（View）通过调用父组件传下来的**函数引用**（Callback）将事件信号传递回父组件。
- **自定义事件命名**: 为了避免与 HTML 原生事件冲突，本课程要求避开类似 `onSearch` (对应 HTML `onsearch`) 的命名，改用如 `onSearchAction`。
- **FlatList 网格布局**: 通过 `numColumns` 属性实现移动端常见的瀑布流/网格展示。
- **Conditional Rendering**: 在 Presenter 中根据数据是否存在，智能切换 `SuspenseView` 与业务视图。

### 解题思路
1. **SearchFormView 的精密配合**:
   - `TextInput` 的 `onChangeText` 负责同步关键词。
   - `SegmentedControl` 切换时不仅要同步 `type`，还要根据产品逻辑立即触发一次 `onSearchAction`，让搜索即刻发生。
2. **SearchResultsView 的事件分发**:
   - 利用 `FlatList` 高效渲染。在每个 `Pressable` 单元中定义闭包 `dishChosenACB`，将当前选中的整个 `dish` 对象作为参数抛出。
3. **DetailsView 的复杂展示与状态联动**:
   - 整合了配料 map 和步骤 map 渲染。
   - 关键逻辑：通过 `isDishInMenu` prop 动态控制“添加到菜单”按钮的 `disabled` 状态和文字描述，防止重复添加。
4. **Presenter 的中继作用**:
   - `SearchPresenter` 充当交通指挥官，把表单的输入流向 Model，把结果的点击流向“当前菜品 ID”状态。

#### 核心实现代码
**SearchPresenter.jsx 事件对接片段:**
```jsx
function textChangeACB(text) { props.model.setSearchQuery(text); }
function typeChangeACB(type) { props.model.setSearchType(type); }
function searchActionACB() { props.model.doSearch(props.model.searchParams); }

return (
    <SearchFormView 
        onTextChange={textChangeACB} 
        onTypeChange={typeChangeACB}
        onSearchAction={searchActionACB} 
    />
);
```
