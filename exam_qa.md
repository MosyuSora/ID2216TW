# DH2642 Exam Q&A - Concept Explanations

> Format: **English Question** -> **中文问题（引用）** -> **中文详细解析** -> **代码中的概念** -> **English Official Short Answer**

---

## TW1: MVP, Events, Callbacks

---

### Q1. What are Custom Events, callbacks, firing vs handling, and "props down, events up"?
> Q1. 什么是自定义事件、回调函数、触发与处理，以及“属性向下传递，事件向上传递”？

**中文详细解析：**

这几个概念其实是同一套交互机制的不同侧面。

**1. 回调函数（callback）**

回调函数就是“我先把一个函数交给别人，等合适的时候再由别人调用它”。在前端里，View 不知道用户操作之后到底要改什么数据，所以它不会自己直接改 Model，而是通过调用 Presenter 传下来的函数，把“发生了什么”报告上去。

**2. 自定义事件（custom event）**

在这门课的代码里，自定义事件通常不是浏览器原生的 `CustomEvent` 对象，而是“通过回调表达的业务事件”。例如：

- 用户改了搜索文字
- 用户点击了搜索
- 用户选中了某道菜

这些都不是 View 自己要处理完的事情，而是要通知上层：“这个业务事件发生了”。

**3. Firing vs Handling**

- **Firing（触发）**：事件从 View 发出去。做法通常是调用一个 props 里的函数，例如 `props.onSearchClick()`。
- **Handling（处理）**：事件在 Presenter 里被接住并转化为真实动作，例如调用 `model.doSearch(...)` 或 `model.setCurrentDishId(...)`。

所以，View 负责说“发生了”，Presenter 负责决定“接下来怎么办”。

**4. Props down, events up**

这是一条单向数据流规则：

- **Props down**：数据从 Presenter 往下传给 View。Presenter 从 Model 读状态，再把这些状态作为 props 交给 View。
- **Events up**：用户交互从 View 往上传。View 不直接改状态，而是调用回调，把事件交给 Presenter。

这条规则的意义是把“显示数据”和“修改数据”分开。View 只负责显示，Presenter 负责连接 Model 和 View，Model 才是状态的真正拥有者。

结合你的代码可以这样理解：Presenter 把搜索框当前文字和菜品类型传给 View，这是 props down；用户输入或提交时，View 调用 `onSearchTextChange`、`onSearchClick`，这是 events up。

**代码中的概念：**

可以直接看 [src/reactjs/searchPresenter.jsx](src/reactjs/searchPresenter.jsx#L14)、[src/views/searchFormView.jsx](src/views/searchFormView.jsx#L5) 和 [src/DinnerModel.js](src/DinnerModel.js#L47)。Presenter 把数据和回调往下传，View 再把事件往上传。

```js
const form = React.createElement(SearchFormView, {
	text: model.searchParams.query,
	onSearchTextChange: function onSearchTextChangeACB(txt){ model.setSearchQuery(txt); },
	onSearchClick: function onSearchClickACB(){ model.doSearch(model.searchParams); }
});

<TextInput
	value={props.text || ''}
	onChangeText={txt => props.onSearchTextChange(txt)}
	onSubmitEditing={() => props.onSearchClick()}
/>
```

上面这段就对应了“props down, events up”：`text` 是往下传的数据，`onSearchTextChange` 和 `onSearchClick` 是往上传的事件通道。

**English Official Short Answer:**

Custom events in this course are usually implemented with callback props rather than browser `CustomEvent` objects. The View **fires** an event by calling a callback such as `onSearchClick()`, and the Presenter **handles** it by deciding what to do, for example calling a Model method. "Props down, events up" means data flows downward from Presenter to View as props, while user interaction flows upward from View to Presenter through callbacks. This keeps state centralized and the UI predictable.

---

### Q2. What is the difference between synchronous and asynchronous callbacks?
> Q2. 同步回调与异步回调有什么区别？

**中文详细解析：**

关键区别不在于“是不是用了函数参数”，而在于“这个回调什么时候执行”。

- **同步回调（synchronous callback）**：调用方立刻执行回调，执行完回调之后才继续往下走。
- **异步回调（asynchronous callback）**：调用方先把任务交出去，回调会在未来某个时间点再执行，当前代码不会停在这里等它。

你可以把同步回调理解成“当场处理”，把异步回调理解成“稍后通知结果”。

在本项目里：

- `filter()` 里的回调是同步回调。数组遍历时，回调立即执行，遍历结束之后结果立刻出来。
- Promise 的 `.then(successACB)` 和 `.catch(failureACB)` 是异步回调。网络请求先发出去，等 Promise resolve 或 reject 之后，这些回调才会被调度执行。

为什么这个区别重要？因为异步回调会带来“现在还没结果”的状态，于是你需要：

- 存 loading 状态
- 存 error 状态
- 处理旧请求比新请求更晚返回的竞态问题

同步回调通常不会有这些问题，因为结果马上就在当前调用栈里产生了。

**代码中的概念：**

同步回调看 [src/DinnerModel.js](src/DinnerModel.js#L38)，异步回调看 [src/resolvePromise.js](src/resolvePromise.js#L39)。一个是在当前数组遍历中立即运行，另一个是在 Promise 完成后才运行。

```js
this.dishes = this.dishes.filter(shouldWeKeepDishCB);

prms.then(successACB).catch(failureACB);
```

`filter()` 会立刻调用 `shouldWeKeepDishCB`；而 `.then()` / `.catch()` 要等异步结果回来后才调度回调。

**English Official Short Answer:**

A synchronous callback runs immediately in the current call stack, before the caller continues. An asynchronous callback runs later, after some future event such as a Promise resolution or a network response. In this project, `filter()` uses synchronous callbacks, while `.then()` and `.catch()` use asynchronous callbacks.

---

### Q3. What are the roles of Model, Presenter, and View?
> Q3. 模型（Model）、展示器（Presenter）、视图（View）分别扮演什么角色？

**中文详细解析：**

MVP 的核心不是把代码分成三份，而是把责任拆清楚。

**Model**

Model 负责保存应用状态和业务逻辑。它知道有哪些数据、这些数据怎么改、异步请求结果放在哪里，但它不负责界面长什么样。在你的项目里，`numberOfGuests`、`dishes`、`currentDishId`、搜索参数、Promise state 都属于 Model 层。

**Presenter**

Presenter 是中间层。它从 Model 里读状态，把状态整理成 View 需要的 props；同时它也接收 View 抛上来的事件，再调用 Model 的方法去改状态。Presenter 的价值不在“显示界面”，而在“组织数据流和交互逻辑”。

**View**

View 是纯渲染层。它的任务是把收到的 props 变成界面，并在用户交互时调用 props 中的回调函数。理想状态下，View 不直接知道数据来自哪里，也不直接知道业务规则。

一句话区分：

- Model 负责“存什么、怎么变”
- Presenter 负责“怎么连接”
- View 负责“怎么显示”

这种分工能让代码更容易测试，也更容易定位问题。数据逻辑错了，看 Model 或 Presenter；界面渲染错了，看 View。

**代码中的概念：**

三层职责可以分别看 [src/DinnerModel.js](src/DinnerModel.js#L1)、[src/reactjs/searchPresenter.jsx](src/reactjs/searchPresenter.jsx#L10) 和 [src/views/searchFormView.jsx](src/views/searchFormView.jsx#L5)。

```js
// Model
export const model = {
	searchParams: {},
	doSearch(params){
		resolvePromise(searchDishes(params), this.searchResultsPromiseState);
	}
};

// Presenter
const ps = model.searchResultsPromiseState;

// View
function SearchFormView(props) {
```

看代码时你可以用一句话判断：存状态的是 Model，接线的是 Presenter，画界面的是 View。

**English Official Short Answer:**

The **Model** stores application state and business logic. The **Presenter** connects the Model and the View by reading Model data, passing it down as props, and reacting to user events. The **View** is responsible for rendering the UI and emitting user actions through callback props. This separation keeps logic organized and maintainable.

---

### Q4. What is a Promise?
> Q4. 什么是 Promise（承诺）？

**中文详细解析：**

Promise 是 JavaScript 对异步结果的一种标准表示方式。它表达的不是“已经拿到结果”，而是“这个结果以后会有”。

它通常有三种状态：

- **pending**：还在进行中
- **fulfilled**：成功拿到结果
- **rejected**：执行失败

Promise 的价值主要有三点：

**1. 统一表达异步结果**

无论是网络请求、延迟任务，还是链式处理，都可以用 Promise 表示，不需要每个 API 都发明自己的一套回调协议。

**2. 链式处理更清楚**

你可以把步骤串起来：先拿 HTTP 响应，再转 JSON，再提取需要的数据。这样比把回调一层层嵌套进去更清楚。

**3. 错误传播更自然**

在 Promise 链中抛出的错误可以沿着链传到 `.catch()`，不用每一层都手动写独立的错误出口。

在这份项目里，API 函数像 `searchDishes()`、`getDishDetails()` 都返回 Promise。Presenter 或 Model 不会立刻拿到最终数据，而是先把 Promise 交给 `resolvePromise()` 去管理 loading、data、error 三种状态。

**代码中的概念：**

Promise 的“产生”和“管理”分别看 [src/dishSource.js](src/dishSource.js#L29) 和 [src/resolvePromise.js](src/resolvePromise.js#L7)。

```js
return fetch(url, {
	headers: {
		"X-DH2642-Key": PROXY_KEY,
		"X-DH2642-Group": "201",
	},
})
	.then(gotResponseACB)
	.then(extractResultsACB);
```

这里只要 `fetch(...)` 返回的还不是最终数据，而是一个“未来会给结果的对象”，它就是 Promise。

**English Official Short Answer:**

A Promise is an object that represents the future result of an asynchronous operation. It can be pending, fulfilled, or rejected. Promises are useful because they standardize async programming, support chaining with `.then()`, and allow centralized error handling with `.catch()`.

---

## TW2: Fetch, Async State, UX

---

### Q5. Why is Fetch / HTTP a two-stage Promise, and where are the two stages in the code?
> Q5. 为什么 Fetch / HTTP 是两阶段 Promise？这两个阶段在代码里分别是什么？

**中文详细解析：**

Fetch 看起来像一次异步操作，但实际上浏览器把它拆成了两个阶段，因为“拿到响应对象”和“读完响应体内容”不是同一件事。

**阶段 1：`fetch(...)` 返回 `Promise<Response>`**

这一步只代表浏览器拿到了 HTTP 响应对象。此时你已经可以检查：

- 状态码是不是成功
- 响应头是什么
- `response.ok` 是否为真

但这时响应体里的 JSON 数据还没有真正解析出来。

**阶段 2：`response.json()` 返回 `Promise<data>`**

这一步才是把响应体读取并解析成 JavaScript 对象。因为读取 body 和解析 JSON 也需要时间，所以它本身又是一个 Promise。

在你的代码中，这两个阶段对应得很清楚：

- 第一阶段发生在 `fetch(url, ...)`
- 第二阶段发生在 `gotResponseACB(response)` 里面的 `return response.json()`

还有一个很容易考到的点：`fetch()` 不会因为 HTTP 404 或 500 自动 reject。只要网络层没断，它通常还是 resolve 一个 `Response`，所以你必须自己检查 `response.ok`。

**代码中的概念：**

看 [src/dishSource.js](src/dishSource.js#L9) 和 [src/dishSource.js](src/dishSource.js#L29)。第一段处理 `Response`，第二段才真正发起 `fetch`。

```js
function gotResponseACB(response) {
	if (!response.ok) throw new Error("API 请求失败，状态码：" + response.status);
	return response.json();
}

return fetch(url, { headers: { ... } })
	.then(gotResponseACB)
	.then(extractResultsACB);
```

所以两阶段就是：先拿 `Response`，再拿 `response.json()` 解析后的数据。

**English Official Short Answer:**

Fetch is a two-stage Promise because receiving the HTTP `Response` object and parsing the response body are separate asynchronous steps. Stage 1 is `fetch(url)` which resolves to a `Response`. Stage 2 is `response.json()` which resolves to parsed data. In this code, the second stage appears inside `gotResponseACB`, after checking `response.ok`.

---

### Q6. How is Promise state managed, and how are race conditions avoided?
> Q6. Promise 状态是如何管理的？又是如何避免竞态条件的？

**中文详细解析：**

只要界面允许用户连续触发异步请求，就可能出现竞态条件。典型情况是：

1. 用户先搜 A
2. 又立刻搜 B
3. B 本来才是最新请求
4. 但 A 比 B 更晚返回
5. 如果你直接写结果，旧的 A 就会覆盖新的 B

`resolvePromise()` 解决这个问题的方式很直接，而且非常标准。

**第一步：记录“当前最新 Promise”**

一旦发起新请求，就把 `promiseState.promise = prms`。这代表“从现在开始，这个 Promise 才是合法的最新请求”。

**第二步：重置旧状态**

把：

- `promiseState.data = null`
- `promiseState.error = null`

这样界面就知道现在进入新一轮加载，而不是继续显示上一次的数据或错误。

**第三步：在成功和失败回调里做身份检查**

不管 Promise 最后成功还是失败，都先检查：

- `promiseState.promise === prms`

只有当这个条件还成立，才说明这个回调属于“当前仍然最新”的那一次请求。否则就说明它已经过期，应该被丢弃。

这个判断就是避免 race condition 的核心。它不是阻止旧请求返回，而是阻止旧请求覆盖新状态。

**代码中的概念：**

直接看 [src/resolvePromise.js](src/resolvePromise.js#L15)。这几行就是 Promise 状态管理和竞态保护的核心。

```js
promiseState.promise = prms;
promiseState.data = null;
promiseState.error = null;

function successACB(data) {
	if (promiseState.promise === prms) {
		promiseState.data = data;
	}
}
```

先把最新 Promise 记下来，再在回调里做“身份比对”，旧请求就算回来也不能覆盖新结果。

**English Official Short Answer:**

Promise state is managed by storing the current Promise together with `data` and `error` in a `promiseState` object. When a new request starts, the code saves that Promise as the latest one and resets previous `data` and `error`. Race conditions are avoided by checking `promiseState.promise === prms` inside success and failure callbacks, so only the latest request is allowed to update the state.

---

### Q7. How do you ensure a good user experience during asynchronous data retrieval?
> Q7. 如何在获取异步数据时保证良好的用户体验？

**中文详细解析：**

异步加载最怕两件事：第一，界面什么都不显示，用户不知道发生了什么；第二，加载、错误、成功这几种状态混在一起，界面不稳定。

一个好的 UX 做法，是让界面在每个时刻都处于一种明确状态。

在你的项目里，这主要靠两层配合：

**1. 条件渲染（conditional rendering）**

Presenter 先判断 Promise state 里有没有 `data`。如果有，就渲染真正的数据 View；如果没有，就渲染一个专门负责异步状态的 View。

这说明 Presenter 在做“界面分流”：

- 有结果 -> 显示结果
- 没结果 -> 交给 SuspenseView

**2. Suspense 风格的状态视图**

`SuspenseView` 不负责业务数据本身，它负责把异步过程翻译成用户看得懂的界面状态：

- 没有 promise：说明还没开始请求，显示 no data
- 有 promise 但还没 data/error：说明正在加载，显示 loading
- 有 error：显示错误信息
- 有 data：返回 `null`，因为真实业务视图会由 Presenter 来接管

这种设计的好处是：

- 不会白屏
- 不会让用户误以为程序卡死
- 错误信息有明确出口
- 成功状态切换清楚，不会和 loading 混在一起

**代码中的概念：**

条件渲染看 [src/reactjs/searchPresenter.jsx](src/reactjs/searchPresenter.jsx#L24)，异步状态展示看 [src/views/suspenseView.jsx](src/views/suspenseView.jsx#L7)。

```js
if (ps?.data) {
	result = React.createElement(SearchResultsView, {
		searchResults: ps.data,
		onDishChosen: function onDishChosenACB(dish){ model.setCurrentDishId(dish.id); }
	});
} else {
	result = React.createElement(SuspenseView, {
		promise: ps?.promise,
		data: ps?.data,
		error: ps?.error
	});
}
```

Presenter 决定“显示结果还是显示状态页”，而 `SuspenseView` 负责把 no data、loading、error 这些状态具体画出来。

**English Official Short Answer:**

Good async UX is achieved by explicit state-based rendering. The Presenter uses conditional rendering: if data exists, it renders the real results view; otherwise it renders a suspense-style status view. The suspense view covers the main states: no data yet, loading, error, and success handoff. This prevents blank screens and gives clear feedback while data is being fetched.

---

### Q8. What are HTTP method, headers, query string, body, and response status, and how are they used in your API code?
> Q8. HTTP 方法、请求头、查询字符串、请求体、响应状态分别是什么？它们在你的 API 代码里怎么用？

**中文详细解析：**

这些都是 HTTP 请求和响应的基本组成部分，考试里通常不是让你背定义，而是让你结合项目代码解释。

**1. Method（HTTP 方法）**

HTTP 方法说明“这次请求想做什么”。常见有 GET、POST、PUT、DELETE。你的项目里请求 Spoonacular 数据时主要使用 **GET**，因为你是在读取数据，不是在服务器上新建或修改资源。

**2. Headers（请求头）**

Headers 是附带在请求上的元信息。它不直接放业务数据，而是提供身份、格式、权限之类的信息。你的代码里最关键的是：

- `X-DH2642-Key`：API key
- `X-DH2642-Group`：课程分组标识

也就是说，headers 在这里承担“认证和标识请求来源”的作用。

**3. Query String（查询字符串）**

Query string 是 URL 末尾 `?` 后面的参数，例如 `?query=pasta&type=main+course`。它通常用于 GET 请求，把搜索条件附在 URL 上。你的代码里是通过 `new URLSearchParams(...)` 生成的，这样可以避免手写字符串拼接出错。

**4. Body（请求体）**

Body 是请求真正携带的数据，通常在 POST、PUT、PATCH 里更常见。你的这些 GET 请求一般没有 body，因为查询条件已经放在 URL query string 里了。

**5. Response Status（响应状态码）**

状态码说明服务器返回结果是否成功，例如：

- 200 表示成功
- 404 表示没找到
- 500 表示服务器错误

在你的代码里，状态通过 `response.ok` 和 `response.status` 来检查。如果 `response.ok` 为假，就抛出错误，而不是继续去解析 JSON。

所以在本项目中，这些概念不是孤立的：

- method 决定请求类型
- query string 负责传搜索条件
- headers 负责认证和组号
- body 在当前 GET 场景下基本不用
- response status 用来决定是否进入成功逻辑

**代码中的概念：**

HTTP 相关概念主要集中在 [src/dishSource.js](src/dishSource.js#L29) 和 [src/dishSource.js](src/dishSource.js#L9)。

```js
const url = PROXY_URL + "/recipes/complexSearch?" + new URLSearchParams(searchParams);

return fetch(url, {
	headers: {
		"X-DH2642-Key": PROXY_KEY,
		"X-DH2642-Group": "201",
	},
})
	.then(gotResponseACB);
```

这里的 `fetch` 默认是 GET；`URLSearchParams` 生成 query string；`headers` 放认证信息；GET 没有 body；`gotResponseACB` 里检查 response status。

**English Official Short Answer:**

The HTTP **method** describes the type of request; this project mainly uses `GET` because it reads data from an API. **Headers** carry metadata such as the API key and group identifier. The **query string** appends search parameters to the URL using `URLSearchParams`. The **body** is not used here because these are GET requests. The **response status** is checked through `response.ok` and `response.status` before parsing JSON.

---

## TW3: Reactivity, Side Effects, Persistence

---

### Q9. What are reactive objects and side effects?
> Q9. 什么是响应式对象（reactive objects）和副作用（side effects）？

**中文详细解析：**

这两个概念经常一起出现，因为“响应式”负责发现数据变化，“副作用”负责在变化发生时做额外动作。

**1. Reactive object（响应式对象）**

响应式对象不是普通“存数据的对象”而已，它还能让系统追踪“谁读取了这个数据、什么时候这个数据变了”。在你的项目里，普通的 `model` 被 `observable(model)` 包装之后，就变成了 reactive object。

这意味着：

- Presenter 读取它的属性时，MobX 能记住依赖关系
- 这些属性变化时，相关组件会自动重新渲染

所以响应式对象解决的是“状态变了，界面怎么自动跟上”的问题。

**2. Side effect（副作用）**

副作用是“数据变化之后，除了更新界面以外，还要额外做的事情”。只要这个动作不是单纯返回一个值或渲染 UI，而是去影响外部世界，它通常就是副作用，例如：

- 发网络请求
- 写入数据库
- 记录日志
- 触发定时器

在你的项目里，`reaction(...)` 就是在定义副作用：当某个响应式数据源变化时，自动运行一个 effect 函数。

因此可以这样区分：

- **响应式对象**负责让变化“可被观察”
- **副作用**负责在观察到变化后执行“额外动作”

**代码中的概念：**

响应式对象的创建看 [src/mobxReactiveModel.js](src/mobxReactiveModel.js#L10)，副作用注册看 [src/mobxReactiveModel.js](src/mobxReactiveModel.js#L24)。

```js
function makeReactiveModel(model) {
	return observable(model);
}

reaction(
	function currentDishIdSourceACB(){ return reactiveModel.currentDishId; },
	function currentDishIdSinkACB(){ reactiveModel.currentDishEffect(); }
);
```

`observable(model)` 让状态变成可观察对象；`reaction(...)` 说明“当这个状态变时，要执行一个副作用”。

**English Official Short Answer:**

Reactive objects are state objects whose property reads and writes are tracked by a reactive system such as MobX. This allows the UI to re-render automatically when observed state changes. Side effects are extra actions triggered by state changes, such as API calls or persistence writes. In this project, reactive objects come from `observable(model)`, and side effects are defined with `reaction(...)`.

---

### Q10. What are the side effects in your reactive objects?
> Q10. 你的响应式对象中有哪些副作用？

**中文详细解析：**

考试回答这一题时，最好不要只说“副作用就是 API 调用”，而是直接指出项目里的具体副作用位置。

在你的代码里，至少有这些明确的副作用：

**1. 初始搜索**

模块加载后，`reactiveModel.doSearch({})` 会立即执行一次默认搜索。这个动作不是渲染的一部分，而是主动发起异步请求，所以它是副作用。

**2. 当前菜品变化后自动抓详情**

`reaction(() => reactiveModel.currentDishId, () => reactiveModel.currentDishEffect())`

这表示：只要当前选中的菜品 ID 变化，就自动去请求该菜品详情。这是典型的“状态变化 -> 触发外部异步请求”的副作用。

**3. 数据持久化到 Firestore**

在持久化连接中，系统监视 `numberOfGuests`、`dishes`、`currentDishId`。一旦这些数据变化，并且 `model.ready` 已经允许写入，就会调用 `setDoc(...)` 把状态同步到 Firestore。这也是副作用，因为它修改了外部存储。

如果你想一句话总结：本项目里的副作用主要分两类，一类是“向 API 读数据”，另一类是“向 Firestore 写数据”。

**代码中的概念：**

三个副作用分别看 [src/mobxReactiveModel.js](src/mobxReactiveModel.js#L21)、[src/mobxReactiveModel.js](src/mobxReactiveModel.js#L24) 和 [src/firestoreModel.js](src/firestoreModel.js#L28)。

```js
reactiveModel.doSearch({});

reaction(
	function currentDishIdSourceACB(){ return reactiveModel.currentDishId; },
	function currentDishIdSinkACB(){ reactiveModel.currentDishEffect(); }
);

if (model.ready) {
	setDoc(docRef, modelToPersistence(model), { merge: true });
}
```

默认搜索、自动抓详情、自动保存到 Firestore，这三件事都不是纯渲染，所以都属于副作用。

**English Official Short Answer:**

The main side effects in this project are: an initial search triggered when the reactive model module loads, automatic fetching of dish details when `currentDishId` changes, and persistence writes to Firestore when observed model data changes. These actions are side effects because they interact with external systems rather than only computing values for rendering.

---

### Q11. What is Persistence?
> Q11. 什么是 Persistence（持久化）？

**中文详细解析：**

Persistence 的核心意思是：把应用当前状态保存到一个在页面刷新后仍然存在的地方。否则，用户一刷新页面，内存里的状态就全没了。

在这个项目里，Persistence 主要指把 Model 的关键状态同步到 Firestore，再在应用启动时从 Firestore 恢复回来。

你可以把它理解成两个方向：

- **保存**：本地 Model 变了，把更新写到云端
- **恢复**：应用重新打开时，从云端读回来再恢复到 Model

为什么这件事重要？因为它让应用不再只是“临时运行一次”的前端，而是有连续性的状态：

- 用户选过的菜还在
- 客人数还在
- 当前浏览的菜品还能恢复

所以，Persistence 解决的是“状态跨刷新、跨会话、跨设备保留”的问题。

**代码中的概念：**

持久化入口在 [src/firestoreModel.js](src/firestoreModel.js#L14)。同一个函数里同时处理“写入云端”和“从云端恢复”。

```js
function connectToPersistence(model, watchFunction) {
	model.ready = false;
	const docRef = doc(db, COLLECTION, "dinnerModel");

	watchFunction(...);

	getDoc(docRef)
		.then(function snapshotToDataACB(snapshot) {
			const data = (snapshot && typeof snapshot.data === 'function') ? snapshot.data() : snapshot;
			return persistenceToModel(data);
		});
}
```

看到 `setDoc(...)` 你就想到“保存”，看到 `getDoc(...)` 你就想到“恢复”，这就是 persistence 的最核心动作。

**English Official Short Answer:**

Persistence means storing application state outside the running page so that it survives reloads or later sessions. In this project, persistence is implemented by synchronizing key Model state with Firestore and restoring it again when the application starts.

---

### Q12. How does persistence relate to reactive objects and side effects?
> Q12. 持久化与响应式对象、副作用之间是什么关系？

**中文详细解析：**

这一题真正想考的是：为什么持久化常常和响应式状态管理一起出现。

答案是，因为持久化本身就是一种“由状态变化触发的副作用”。

逻辑链条如下：

**第一步：先有响应式对象**

Model 被做成 reactive object 之后，系统才能准确知道哪些属性变了，例如：

- `numberOfGuests`
- `dishes`
- `currentDishId`

**第二步：再定义副作用规则**

一旦这些被观察的数据变化，就自动执行一个 effect，把最新状态写去 Firestore。

也就是说：

- reactive object 提供“可观察的状态”
- side effect 提供“变化后自动执行的动作”
- persistence 是这个动作中的一个具体业务目标

从工程角度看，这种做法比“每个按钮点一次就手写一次保存逻辑”更稳，因为保存逻辑不是绑在某个按钮上，而是绑在“状态变化”本身上。只要状态正确变化，持久化就不会漏掉。

当然，这也带来一个风险：应用刚启动、数据还没从云端恢复完时，不能立刻反向写回去，所以项目里才需要 `model.ready` 这样的写入门控。它本质上也是在控制副作用何时允许发生。

**代码中的概念：**

最直接看 [src/mobxReactiveModel.js](src/mobxReactiveModel.js#L10) 和 [src/firestoreModel.js](src/firestoreModel.js#L28)。前者把 Model 变成可观察状态，后者把“状态变化 -> 写 Firestore”做成 reaction 风格的副作用。

```js
function makeReactiveModel(model) {
	return observable(model);
}

watchFunction(
	function dataDetectorACB() {
		return [model.numberOfGuests, model.dishes, model.currentDishId];
	},
	function effectHandlerACB() {
		if (model.ready) {
			setDoc(docRef, modelToPersistence(model), { merge: true });
		}
	}
);
```

这段代码正好说明三件事是怎么串起来的：先有 reactive state，再监听变化，最后把 persistence 作为 side effect 执行出去。

**English Official Short Answer:**

Persistence is implemented as a side effect on reactive state. The reactive object makes changes to Model state observable, and a reaction watches those changes and writes the new state to Firestore. In other words, reactive objects provide observable data, side effects react to changes, and persistence is one concrete side effect built on top of that mechanism.

---

## Quick Review Checklist

- [ ] I can explain custom events as callback-based business events.
- [ ] I can distinguish firing in the View from handling in the Presenter.
- [ ] I can explain "props down, events up" with one concrete project example.
- [ ] I can distinguish synchronous callbacks from asynchronous callbacks.
- [ ] I can explain the roles of Model, Presenter, and View in MVP.
- [ ] I can define a Promise and its three states.
- [ ] I can identify the two stages of Fetch: `fetch()` and `response.json()`.
- [ ] I can explain how `resolvePromise()` avoids stale updates.
- [ ] I can explain conditional rendering and suspense-style loading/error handling.
- [ ] I can explain method, headers, query string, body, and response status in the API code.
- [ ] I can define reactive objects and side effects.
- [ ] I can name the concrete side effects in this project.
- [ ] I can explain persistence as Firestore save-and-restore of Model state.
- [ ] I can explain persistence as a side effect built on reactive state.