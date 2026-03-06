# ID2216 TW 2.1 Fetching Data from Web APIs 解析

## 1. Promise 的三种状态及其在 API 请求中的体现

在 Web 开发中，API 请求通常是异步的。JavaScript 使用 **Promise** 对象来处理这些异步操作。一个 Promise 必然处于以下三种状态之一：

*   **Pending（进行中）**: 初始状态，既没有被兑现，也没有被拒绝。在 `fetch()` 请求发出但尚未收到响应（或超时）时，Promise 处于此状态。UI 通常在此阶段显示“加载中（Loading）”图标。
*   **Fulfilled（已兑现/成功）**: 意味着操作成功完成。当 API 成功返回数据（例如 HTTP 状态码 200）且数据格式解析正确时，Promise 变为 Fulfilled。此时可以获取到具体的数据。
*   **Rejected（已拒绝/失败）**: 意味着操作失败。如果网络断开、请求超时、或者 API 返回了非 2xx 的错误代码，Promise 就会变为 Rejected。此时应进行错误处理。

## 2. `fetch()` 的基本用法

`fetch()` 是现代浏览器自带的用于发起网络请求的 API，它返回一个 Promise。

### 基本流程：
1.  **发起请求**: `fetch(url)`。
2.  **处理 Response 对象**: 第一个 `.then()` 接收到的是 `Response` 对象。我们需要检查 `response.ok` 并调用 `response.json()` 来将原始数据流转换为 JavaScript 对象。
3.  **转换 JSON**: `response.json()` 同样返回一个 Promise。
4.  **错误捕捉**: 使用 `.catch()` 来捕获网络错误或手动抛出的异常。

```javascript
fetch("https://api.example.com/data")
  .then(response => {
    if (!response.ok) {
      throw new Error("网络响应不正常");
    }
    return response.json();
  })
  .then(data => {
    console.log("获取到的数据:", data);
  })
  .catch(error => {
    console.error("请求失败:", error);
  });
```

## 3. Spoonacular API 配置与参数

Spoonacular 是一个常用的食谱搜索 API。在使用时需要注意以下几点：

*   **apiKey 配置**: 通常需要在请求的 URL 中作为 Query Parameter (查询参数) 传递，或者放在 HTTP Header 中。例如：`?apiKey=YOUR_KEY_HERE`。
*   **常用参数**:
    *   `query`: 搜索关键词（如 "pasta"）。
    *   `cuisine`: 菜系过滤（如 "Italian", "Chinese"）。
    *   `diet`: 饮食限制（如 "vegetarian", "gluten free"）。
*   **传递方式**: 这些参数通过 URL 编码拼接到 API 地址后，例如：
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=xxx&query=apple&cuisine=french`

## 4. 架构设计与状态管理

### 为什么逻辑应放在 Model 层？
根据 **MVC (Model-View-Controller)** 架构原则，**Model 层**负责处理数据和业务逻辑。
*   **解耦**: 视图（View）只负责展示，不关心数据是从 API 还是本地缓存获取的。
*   **可维护性**: 如果 API 地址或数据格式发生变化，只需修改 Model 层，而不会影响到 UI 组件。

### 使用 `searchResultsPromiseState` 管理加载状态
为了在 UI 中优雅地处理异步过程，我们通常在 Model 中维护一个状态对象（例如 `searchResultsPromiseState`），它包含：
*   `promise`: 当前正在进行的 Promise 对象。
*   `data`: 成功获取后的数据（Fulfilled）。
*   `error`: 失败后的错误信息（Rejected）。

在 React/Vue 等框架中，UI 组件可以根据这个状态对象的状态（是 null、有 data 还是有 error）来决定渲染 **加载动画**、**搜索结果列表** 还是 **错误提示**。
