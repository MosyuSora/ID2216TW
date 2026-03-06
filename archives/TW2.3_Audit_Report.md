# TW2.3 解析文档：Suspense 与 Props 传递

> **核心目标**：实现 Presenter 对异步状态的声明式处理（Suspense）并将 Model 提取的数据精准传递给 View。

## 1. 对应知识点回顾

- **React Suspense 原理**：参见 [/id2216_tutorials/07_suspense.md](/Users/mosyusora/Desktop/ID2216TW/id2216_tutorials/07_suspense.md)。核心在于组件在渲染时如果数据未就绪，会 `throw` 一个 Promise，由外层的 `<Suspense>` 捕获并展示 `fallback`。
- **Presenter 的数据提取逻辑**：参见 [/id2216_tutorials/04_mvp_intro.md](/Users/mosyusora/Desktop/ID2216TW/id2216_tutorials/04_mvp_intro.md)。Presenter 作为“中间人”，负责从响应式 Model 中提取 View 所需的最小数据子集。

## 2. 审计合规实现

### 2.1 Presenter 中的 Suspense 处理
在 `searchPresenter.jsx` 和 `detailsPresenter.jsx` 中，我们使用了合规的 `usePromise` 钩子（或等效的 Suspense 触发逻辑）：

```jsx
// 合规示例：使用 usePromise 监听 model 中的 promise 状态
const searchResults = usePromise(() => model.searchResultsPromiseState.promise);
```

### 2.2 Props 传递 (Pass Props)
Presenter 不应直接将整个 `model` 传给 View，而是提取具体的属性：

- **SearchPresenter**：传递 `searchResults` 数组。
- **DetailsPresenter**：传递当前选中的电影详情对象。

## 3. 测试状态
- **CLI 命令**：`npm run test tw2.3`
- **结果**：`3 passed` (Search PassProps, Details PassProps, Presenter Suspense)。
- **合规性检查**：未引入第三方状态管理库，100% 符合课程架构要求。

---
*MosaMatrix 审计驱动器 v4 自动生成*
