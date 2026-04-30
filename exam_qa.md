# DH2642 Exam Q&A — TW1 + TW2 + TW3

> 格式：**问题** → **中文详细解析** → **English Short Answer**

---

## TW1: MVP, Callbacks, Events

---

### Q1: What are the roles of Model, Presenter, and View?

**中文详细解析：**

MVP 是本课程的核心架构模式，三种角色各司其职：

- **Model（模型）**：应用的"大脑"。负责存储所有状态（`dishes`、`numberOfGuests`、`currentDishId`）和业务逻辑（`addToMenu`、`doSearch`）。Model 完全不知道 UI 的存在，不引用任何 React 组件或渲染代码。在你的项目中，`DinnerModel.js` 就是一个纯 JS 对象，包含数据和操作数据的方法。
- **Presenter（展示器）**：Model 和 View 之间的"翻译官"。从 Model 读取数据，作为 props 传递给 View；同时接收 View 触发的回调事件，将用户操作转化为对 Model 的方法调用。例如 `Search` Presenter 从 `model.searchResultsPromiseState` 读取搜索结果，创建 `SearchResultsView` 或 `SuspenseView`。
- **View（视图）**：纯 UI 组件，只负责渲染，不包含任何业务逻辑。通过 props 接收数据，通过回调函数向上通知 Presenter。例如 `SearchFormView` 只渲染输入框和按钮，并不自己发起搜索。

**English Short Answer:**

- **Model**: Stores application state and business logic. No UI code. Example: `DinnerModel.js` holds `dishes`, `numberOfGuests`, `currentDishId` and methods like `doSearch()`, `addToMenu()`.
- **Presenter**: Mediates between Model and View. Reads Model state, passes as props down to View. Receives callbacks from View, calls Model methods. Example: `searchPresenter.jsx`, `sidebarPresenter.jsx`.
- **View**: Pure rendering component. Receives data via props, sends user actions via callback props. No business logic. Example: `searchFormView.jsx`, `searchResultsView.jsx`.

---

### Q2: What does "Props Down, Events Up" mean?

**中文详细解析：**

这是 MVP 模式中数据流的核心规则：

- **Props Down（属性向下）**：数据单向地从 Presenter 流向 View。Presenter 将 Model 中的数据作为 props 传递给 View 组件。View 是被动的，它只显示传入的数据，从不主动修改数据源。
- **Events Up（事件向上）**：当用户在 View 中操作时（点击、输入），View 不直接修改数据，而是通过调用 props 中传递的回调函数向 Presenter 报告事件。Presenter 再决定如何处理（调用 Model 方法）。

这种单向数据流确保了程序的可预测性：数据永远在 Model 中，View 永远只是 Model 的投影。

在你的代码中，`Search` Presenter 将 `text`、`type` 作为 props 传给 `SearchFormView`（props down），同时传入 `onSearchClick`、`onSearchTextChange` 回调函数。当用户在输入框中打字时，View 调用 `props.onSearchTextChange(txt)`（events up）。

**English Short Answer:**

- **Props Down ↓**: Presenter passes Model data to View as props. Data flows one-way, View never modifies data directly. Example: `SearchFormView` receives `text`, `type` props.
- **Events Up ↑**: View notifies Presenter of user actions by calling callback functions received as props. Example: `onSearchClick()`, `onSearchTextChange(txt)`. Presenter then calls Model methods.
- This ensures unidirectional data flow — state always lives in Model.

---

### Q3: Custom Events — What is the difference between Firing and Handling?

**中文详细解析：**

自定义事件（Custom Events）在本项目中不是浏览器原生的 `CustomEvent`，而是通过回调函数实现的事件模式：

- **触发（Firing）**：View 在响应用户交互时调用 props 中的回调函数。例如 `SearchFormView` 中，当用户按回车键时执行 `props.onSearchClick()`。View 不关心这个函数具体做什么，只知道"该事件发生了"。
- **处理（Handling）**：Presenter 在创建 View 时定义这些回调函数的具体实现。例如 `onSearchClickACB` 内部调用 `model.doSearch(model.searchParams)`。Presenter 决定事件发生后应该做什么。

这种分工让 View 保持简单和可复用——同一个 View 可以通过传入不同的回调函数，在不同的 Presenter 中表现出不同的行为。

**English Short Answer:**

- **Firing**: View calls callback props when user interacts. View doesn't know what happens — just signals "this event occurred". Example: `props.onSearchClick()` in `SearchFormView`.
- **Handling**: Presenter defines what the callback does. Example: `function onSearchClickACB() { model.doSearch(...) }`.
- Fire in View, Handle in Presenter. This keeps View simple and reusable.

---

### Q4: What is the difference between Synchronous and Asynchronous Callbacks?

**中文详细解析：**

回调函数根据执行时机分为两类：

- **同步回调（Synchronous Callback）**：回调函数在当前代码执行完毕前被立即调用，阻塞后续代码。典型的同步回调包括数组的高阶函数：`Array.filter(cb)`、`Array.sort(cb)`、`Array.map(cb)`。这些方法会在回调函数执行完后才返回结果，不会引入异步性。例如 `DinnerModel.js` 中 `this.dishes.filter(shouldWeKeepDishCB)` —— 回调对每个元素立即执行。

- **异步回调（Asynchronous Callback）**：回调函数在将来的某个时刻被调用，不阻塞当前代码的执行。Promise 的 `.then(successACB)` 是最典型的异步回调 —— 回调被放入微任务队列，等 Promise resolve 后才执行。其他例子包括 `setTimeout`、事件监听器、`fetch` 回调。

关键区别：同步回调在同一个调用栈中完成；异步回调在独立的微任务/宏任务中执行，不阻塞事件循环。

**English Short Answer:**

- **Synchronous**: Executes immediately in the same call stack. Blocks current code. Examples: `array.filter(cb)`, `array.sort(cb)` in `DinnerModel.js`.
- **Asynchronous**: Executes later when condition is met. Does not block the event loop. Examples: `.then(successACB)` in `resolvePromise.js`, `setTimeout`, event listeners.
- Key difference: sync runs now (same call stack), async runs later (microtask/macrotask queue).

---

## TW2: Promises, Fetch, Async State

---

### Q5: What is a Promise? Why use them?

**中文详细解析：**

Promise 是 JavaScript 中处理异步操作的核心机制。它是一个表示"将来某个时刻才会完成"操作的对象。

Promise 有三种状态：
- **Pending（待定）**：操作仍在进行中
- **Fulfilled（已兑现）**：操作成功完成
- **Rejected（已拒绝）**：操作失败

Promise 的优点：
1. **链式调用**：通过 `.then()` 串联多个异步操作，避免"回调地狱"（嵌套回调层层缩进）
2. **统一错误处理**：`.catch()` 可以捕获链条中任何一步的错误
3. **可组合性**：`Promise.all()`、`Promise.race()` 等组合多个 Promise

在你的项目中，所有 API 调用（`searchDishes`、`getDishDetails`）都返回 Promise。`resolvePromise.js` 是 Promise 状态管理的核心工具。

**English Short Answer:**

A Promise represents an async operation with 3 states: pending, fulfilled, rejected. Benefits: chainable via `.then()` (avoids callback hell), centralized error handling via `.catch()`, composable with `Promise.all()`. All API calls in this project return Promises.

---

### Q6: Why is Fetch/HTTP a Two-Stage Promise? Identify the stages in your code.

**中文详细解析：**

Fetch 是两阶段 Promise 是因为浏览器将 HTTP 响应分为两个部分处理：

- **阶段 1（`fetch()` → `Promise<Response>`）**：fetch 返回的 Promise 解析为 `Response` 对象。此时 HTTP 状态码和响应头已经可用，但响应体（body）可能尚未完全下载。**重要**：fetch 不会因为 HTTP 错误状态码（如 404、500）而 reject —— 它只在网络故障时才 reject。你必须手动检查 `response.ok` 或 `response.status`。

- **阶段 2（`response.json()` → `Promise<data>`）**：将响应体解析为 JSON 对象，这是一个独立的异步操作，因为响应体可能很大，需要时间来读取和解析。

在你的代码 `dishSource.js` 中：
```js
function gotResponseACB(response) {
    if (!response.ok) throw new Error(...);  // 检查状态码
    return response.json();                   // 阶段 2: 解析 JSON
}
```

这种两阶段设计让你可以在解析 JSON 之前检查 HTTP 响应是否成功，避免对错误响应进行无用的 JSON 解析。

**English Short Answer:**

- **Stage 1**: `fetch(url)` → `Promise<Response>`. Headers & status available. `fetch()` never rejects on HTTP 404/500 — must check `response.ok` manually.
- **Stage 2**: `response.json()` → `Promise<data>`. Parses body as JSON, separate async operation.
- In `dishSource.js`: `gotResponseACB` checks `response.ok` first, then calls `.json()` for stage 2.

---

### Q7: Why does `searchDishes` have two `.then()` calls but `getMenuDetails` only one?

**中文详细解析：**

这不是"两阶段"的数量问题，而是取决于 API 返回的数据结构是否需要额外处理：

- `searchDishes` 调用的 API 返回一个包装对象：
  ```json
  { "results": [...dishes...], "offset": 0, "number": 10, "totalResults": 500 }
  ```
  我们只需要 `results` 数组，所以需要 `extractResultsACB(data)` 来提取 `data.results`。因此多了一个 `.then(extractResultsACB)`。

- `getMenuDetails` 调用的 API 直接返回菜品数组：
  ```json
  [{ id: 1, title: "Pasta", ... }, { id: 2, title: "Pizza", ... }]
  ```
  数组本身就是我们需要的，无需额外提取，直接返回即可。

第三个 `.then()`（`extractResultsACB`）是数据转换步骤，不是新的 Promise 阶段。`fetch()` + `.json()` 才是核心的两阶段。

**English Short Answer:**

- `searchDishes`: API wraps results in `{ results: [...], totalResults: 500 }` → needs `extractResultsACB` to unwrap `data.results`. Hence extra `.then()`.
- `getMenuDetails`: API directly returns `[{...}, {...}]` → no unwrapping needed. Full `.then()` chain is 2 steps (not 3).
- The extra `.then()` is data transformation, not a new Promise stage. The two core stages remain: fetch → .json().

---

### Q8: How are HTTP Method, Headers, Query String, Body, and Response Status used in your API calls?

**中文详细解析：**

在你的 `dishSource.js` 中，每个 fetch 请求都涉及这些 HTTP 概念：

- **HTTP Method（方法）**：`fetch()` 默认使用 GET 方法。GET 用于从服务器获取数据，不修改服务器状态。你的项目只使用 GET（通过代理访问 Spoonacular API）。POST 才会用 body，但本项目不需要。

- **Headers（请求头）**：通过 `headers` 对象传递额外信息。你的代码使用了两个自定义头：
  - `X-DH2642-Key`：API 密钥，用于身份认证
  - `X-DH2642-Group`：组号 `"201"`（来自 Canvas ID 59201 的后三位）

- **Query String（查询字符串）**：通过 `new URLSearchParams(searchParams)` 构建 URL 参数。例如 `{ query: "pasta", type: "main course" }` 会变为 `?query=pasta&type=main+course`。对于批量接口，使用 `{ ids: "1,2,3" }`。

- **Body（请求体）**：GET 请求没有 body。只有 POST/PUT 请求才会在 `fetch()` 的第二个参数中设置 `body` 字段。

- **Response Status（响应状态码）**：在 `gotResponseACB` 中检查 `response.ok`。`response.ok` 在状态码为 200-299 时返回 `true`。如果不 ok，抛出包含 `response.status` 的错误。

**English Short Answer:**

- **Method**: GET (default). Only reading data, never modifying server state.
- **Headers**: `X-DH2642-Key` for authentication, `X-DH2642-Group: "201"` for group ID.
- **Query String**: Built with `new URLSearchParams(params)` → `?query=pasta&type=main+course`.
- **Body**: Not used (GET requests have no body; only POST/PUT use body).
- **Response Status**: Checked via `response.ok` (true for 200-299) in `gotResponseACB`. Throws error with `response.status` on failure.

---

### Q9: How does `resolvePromise.js` manage Promise state and avoid race conditions?

**中文详细解析：**

竞态条件（Race Condition）发生在用户快速连续操作时。例如：用户先搜索 "chicken"，在结果返回前又搜索 "pasta"。如果 "chicken" 的请求先发出但后返回，它的结果可能覆盖 "pasta" 的结果 —— 用户看到的是 "chicken" 而不是最新搜索的 "pasta"。

`resolvePromise.js` 通过以下机制解决这个问题：

1. **`promiseState.promise` 始终指向最新发起的请求**。每当新的 `resolvePromise(prms, promiseState)` 被调用时，`promiseState.promise` 被更新为 `prms`。

2. **回调函数中的身份检查**：在 `successACB` 和 `failureACB` 中，比较 `promiseState.promise === prms`（闭包中捕获的 `prms`）。如果 `promiseState.promise` 已经变了（说明有更新的请求发出），旧的 `prms` 不匹配，回调直接跳过，不更新 data/error。

3. **初始化状态重置**：每次调用时先将 `data` 和 `error` 设为 `null`，确保 old data 不会短暂显示。

这样确保了只有最新请求的结果才会被写入 `promiseState`。

**English Short Answer:**

Race condition: user searches "chicken" then immediately "pasta". Without protection, stale "chicken" results could overwrite "pasta".

Solution in `resolvePromise.js`:
- `promiseState.promise` always stores the latest request's promise.
- In callbacks: `if (promiseState.promise === prms)` — only update state if this promise is still the latest.
- Sets `data` and `error` to `null` at start of each new request.
- Stale callbacks are silently discarded when their promise no longer matches.

---

### Q10: How do you ensure good UX during async data retrieval? (Conditional Rendering, Suspense)

**中文详细解析：**

良好的异步数据体验需要覆盖所有可能的状态。你的实现通过两层机制保证：

**第一层：`SuspenseView`（4 种状态）**

`SuspenseView` 根据 Promise 状态渲染不同的 UI：

1. **无数据（`!promise`）**：显示 "no data" 文本 —— 用户知道还没有任何搜索被触发
2. **加载中（`promise && !data && !error`）**：显示加载动画 GIF —— 用户知道正在进行中，不会以为应用卡死
3. **失败（`error`）**：显示红色错误消息 —— 用户知道出了问题，可以看到错误信息
4. **成功（`data`）**：返回 `null` —— 由 Presenter 接管，渲染实际的数据 View

**第二层：Presenter 中的条件渲染**

在 `searchPresenter.jsx` 中：
```js
if (ps?.data) {
    result = <SearchResultsView .../>;   // 有数据 → 渲染结果
} else {
    result = <SuspenseView .../>;        // 无数据 → 加载/错误状态
}
```

这种设计让 UI 永远处于明确的、对用户友好的状态，从不白屏或卡死。

**English Short Answer:**

Two layers:
1. **SuspenseView** handles 4 states: no promise → "no data", loading → animated GIF, error → red message, success → null (Presenter takes over).
2. **Presenter conditional rendering**: `if (ps?.data) render ResultsView; else render SuspenseView`.
This ensures UI is always in a clear, user-friendly state — never blank or stuck.

---

## TW3: Persistence, Reactive Objects, Side Effects

---

### Q11: What is Persistence? How does Model ↔ Firestore bidirectional sync work?

**中文详细解析：**

持久化（Persistence）是指将应用状态保存到云端数据库（Firebase Firestore），使数据在页面刷新、关闭重开甚至换设备后都能恢复。

你的代码实现了**双向同步**：

**方向一：Model → Firestore（侧向持久化 / Sideways Persistence）**

通过 MobX 的 `reaction` 函数监听 Model 中的关键属性变化：
```js
watchFunction(
    () => [model.numberOfGuests, model.dishes, model.currentDishId],  // 追踪
    () => { if (model.ready) setDoc(docRef, modelToPersistence(model), { merge: true }); }
);
```
- 只追踪 `numberOfGuests`、`dishes`、`currentDishId` 三个属性
- **门控** `model.ready`：只有初始恢复完成后才允许写入
- **序列化** `modelToPersistence()`：将 Model 转为轻量数据（只保存 `id` 和 `title`）
- **合并写入** `{ merge: true }`：只更新指定字段，不覆盖云端其他数据

**方向二：Firestore → Model（恢复持久化 / Restore）**

应用启动时：
```js
getDoc(docRef)
    .then(snapshot => persistenceToModel(data))
    .then(() => { model.ready = true; });
```
- 从 Firestore 读取文档
- `persistenceToModel()` 恢复 `numberOfGuests`、`currentDishId` 和菜品的 `id`+`title`
- 重新调用 `getMenuDetails(ids)` 获取完整菜谱详情（因为 Firestore 只存了轻量数据）
- 失败时容忍错误（`.catch` 忽略），因为 ID 已经保留了

**English Short Answer:**

Bidirectional sync between Model and Firestore:
- **Model → Firestore**: MobX `reaction` watches `[dishes, numberOfGuests, currentDishId]`. When changed AND `model.ready === true`, writes via `setDoc(docRef, serializedData, { merge: true })`.
- **Firestore → Model**: `getDoc(docRef)` on startup. Restores basic data (IDs + titles), then re-fetches full dish details via `getMenuDetails(ids)`.
- **Write guard**: `model.ready = false` during initial restore, set to `true` after restore completes.
- Serialization: Firestore stores only `id` + `title` (lightweight). Full details fetched from API on restore.

---

### Q12: What are Reactive Objects in MobX? How do they work?

**中文详细解析：**

MobX 的响应式系统是本项目的状态管理核心：

**`observable(model)`**：将普通的 JavaScript 对象包装成可观察对象。MobX 会拦截对该对象属性的读取和写入。读取时自动记录"谁依赖了这个属性"；写入时自动通知所有依赖者更新。

**`observer(Component)`**：包裹 React 组件，使其能够自动感知 MobX observable 的变化。当组件渲染期间读取的任何 observable 属性发生变化时，组件自动重新渲染。不需要手动调用 `setState` 或写 `useEffect`。

**工作机制**：
- 任何被 `observer()` 包裹的 Presenter 组件读取 `reactiveModel.dishes` 时，MobX 自动建立依赖追踪
- 当 `dishes` 发生变化（如 `addToMenu` 或 `removeFromMenu`），MobX 自动触发该组件的重新渲染
- 只重新渲染真正依赖了变化属性的组件，不会全局重渲染

在你的代码中：`Sidebar` Presenter 被 `observer()` 包裹，当 `model.dishes` 变化时自动重新渲染，无需手动管理。

**English Short Answer:**

- `observable(model)`: Wraps plain JS object — MobX intercepts reads/writes. Reads track dependencies; writes notify dependents.
- `observer(Component)`: Wraps React component — auto re-renders when any observable property it reads during render changes.
- Automatic dependency tracking: component only re-renders for properties it actually uses. No manual `setState` or `useEffect` needed.
- Example: `Sidebar` Presenter auto re-renders when `model.dishes` changes.

---

### Q13: What are Side Effects in Reactive Objects? Identify them in your code.

**中文详细解析：**

副作用（Side Effect）是指在响应式数据变化时，自动执行的非渲染操作。渲染本身不是副作用（因为它直接产生 UI），副作用是指额外的、不在渲染流程中的操作，如 API 调用、数据持久化。

你的项目中有 **3 个副作用**：

1. **初始化搜索（Initial Search）**：`reactiveModel.doSearch({})` 在模块加载时立即执行。这是一个一次性的初始化副作用，确保应用启动后有默认数据显示。

2. **菜品详情自动抓取（Auto-fetch dish details）**：
   ```js
   reaction(
       () => reactiveModel.currentDishId,     // 数据源
       () => reactiveModel.currentDishEffect()  // 副作用
   );
   ```
   当用户点击菜品（`currentDishId` 变化）时，自动发起 `getDishDetails(id)` API 请求。`reaction()` 是 MobX 提供的副作用原语 —— 类似 React 的 `useEffect`，但不依赖 React。它在渲染之外运行，只在数据变化时触发。

3. **数据持久化（Persistence sync）**：在 `firestoreModel.js` 中，`reaction` 监听 `[dishes, numberOfGuests, currentDishId]` 的变化，自动将数据同步到 Firestore。

**English Short Answer:**

Side effects: non-rendering operations triggered by reactive data changes (API calls, persistence). Three in this project:
1. **Initial search**: `reactiveModel.doSearch({})` — runs immediately on module load.
2. **Auto-fetch dish details**: `reaction(() => currentDishId, () => currentDishEffect())` — fetches API details when selected dish changes.
3. **Persistence sync**: `reaction(() => [dishes, guests], () => setDoc(...))` — auto-saves to Firestore when data changes.
`reaction()` is MobX's side effect primitive, similar to React's `useEffect` but framework-agnostic. Runs outside render, triggered by data changes.

---

### Q14: What is `model.ready` and why is it needed?

**中文详细解析：**

`model.ready` 是一个**门控标志（Write Guard）**，用于防止持久化同步中的循环覆盖问题。

**问题场景**：没有 `model.ready` 时：
1. 应用启动，从 Firestore 读取数据
2. 读取过程中，数据逐步恢复到 Model
3. 每次恢复（设置 `dishes`、`numberOfGuests`）都触发 MobX `reaction`
4. `reaction` 立即将不完整的数据写回 Firestore
5. 覆盖了云端的完整数据

**解决方案**：
- 初始化时 `model.ready = false` —— 锁定写入
- 在恢复持久化的所有步骤完成后（包括重新获取菜品详情），设置 `model.ready = true` —— 解锁写入
- 在写入 Firestore 的 `reaction` 回调中检查 `if (model.ready)` —— 只有解锁后才写入

这确保了：
- 启动时不会用半恢复数据覆盖云端
- 恢复完成后，后续的用户操作能正常同步到云端
- 数据完整性得到保证

**English Short Answer:**

`model.ready` is a write-guard flag:
- Set to `false` during initial Firestore restore — prevents MobX reaction from writing half-restored state back to cloud and overwriting good data.
- Set to `true` after restore completes — enables normal persistence sync for user actions.
- Checked in persistence `reaction`: `if (model.ready) { setDoc(...) }`.
- Without this, every incremental restore step would trigger a Firestore write, potentially overwriting complete cloud data with partial state.

---

### Q15: What are `modelToPersistence` and `persistenceToModel`? Why are they needed?

**中文详细解析：**

这两个函数是序列化/反序列化层，解决 Model（内存中的丰富对象）与 Firestore（只能存储简单 JSON）之间的差异：

**`modelToPersistence(model)` — 序列化（Model → Firestore）**：
- 将 Model 中的复杂数据结构转为轻量的 JSON 对象
- **关键设计**：只保存菜品的 `id` 和 `title`，不保存完整的 `extendedIngredients`、`analyzedInstructions` 等详情
- 原因：Firestore 文档有大小限制，且完整菜谱数据可以从 API 重新获取（数据源是权威的）

**`persistenceToModel(data)` — 反序列化（Firestore → Model）**：
- 从 Firestore 读取的轻量数据恢复 `numberOfGuests`、`currentDishId`
- 菜品先用 `id` + `title` 占位显示
- **重新获取完整详情**：调用 `getMenuDetails(ids)` 获取完整菜谱数据
- **容错处理**：如果 `getMenuDetails` 失败（网络问题），`.catch` 忽略错误——菜品的 ID 和标题已经保留了，用户可以继续操作

**English Short Answer:**

- `modelToPersistence`: Serializer. Converts Model → lightweight object for Firestore. Only saves `id` + `title` (not full recipe data) to keep documents small. Full details are re-fetched from API on restore.
- `persistenceToModel`: Deserializer. Restores basic data from Firestore → Model. Re-fetches full dish details via `getMenuDetails(ids)`. Tolerates fetch failures (IDs preserved, user can still see dish names).
- This separation keeps Firestore documents lightweight and treats the API as the single source of truth for dish details.

---

## 考前自检 Checklist

- [ ] `npm run dev` 启动成功，初始搜索自动运行
- [ ] 能定位 `fetch` 两阶段代码（`gotResponseACB`）
- [ ] 能定位竞态条件检查（`promiseState.promise === prms`）
- [ ] 能解释 `SuspenseView` 的 4 种状态切换
- [ ] 能解释 HTTP Headers（`X-DH2642-Key`）、Query String（`URLSearchParams`）、Response Status（`response.ok`）
- [ ] 能画出 MVP 三角色数据流图
- [ ] 能解释 "Props Down, Events Up" 在你的代码中的体现
- [ ] 能区分同步回调（`filter`）和异步回调（`.then`）
- [ ] 能解释持久化双向同步的三个关键点：序列化、门控、重新获取详情
- [ ] 能解释 `observable()` 和 `observer()` 的作用
- [ ] 能列出 3 个副作用及其代码位置
- [ ] 能解释 `model.ready` 为什么必要（防止循环覆盖）
