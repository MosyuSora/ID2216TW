# TW2.2 Side Effects & Application State - 副作用与状态管理解析

### 问题内容
在 Application State (Model) 中管理异步数据的生命周期，并实现自动化数据同步。
1. **Promise 解析器**：实现 `resolvePromise` 通用工具，处理 Promise 的加载、成功、失败状态，并解决竞态条件。
2. **状态集成**：在 Model 中添加搜索参数及搜索结果的 Promise 状态。
3. **自动化副作用**：监听 `currentDishId` 的变化，当老板切换菜品时，自动触发 API 请求抓取详情。

### 问题 Scope
- **工具文件**: [`/src/resolvePromise.js`](../../src/resolvePromise.js)
- **模型文件**: [`/src/DinnerModel.js`](../../src/DinnerModel.js)
- **响应式配置**: [`/src/mobxReactiveModel.js`](../../src/mobxReactiveModel.js)

### 知识点回顾
- **竞态条件 (Race Condition)**: 当多个异步请求几乎同时发起，但响应返回顺序不确定时，可能导致陈旧数据覆盖最新数据。
- **Promise 状态管理**: 将异步请求映射为对象：`{ promise, data, error }`。
- **MobX `reaction`**: 一种副作用钩子，当观察的数据发生变化时触发特定动作，常用于“自动执行”网络请求。
- **ACB 命名范式**: 用于副作用处理的 Action Callback 约定。

### 解题思路
1. **防御竞态条件**:
   - 在 `resolvePromise` 中，通过 `if (promiseState.promise === prms)` 检查。只有当当前处理的 Promise 对象与状态对象中保存的最新 Promise 是同一个时，才允许写入结果。
2. **Model 逻辑解耦**:
   - `searchParams` 用于存储当前的搜索偏好。
   - `doSearch` 方法仅负责发起请求并将 Promise 交给解析器，不关心具体的 UI 渲染。
3. **响应式链条**:
   - 使用 MobX `reaction` 建立“观测-反应”机制。探测器函数返回 `model.currentDishId`，处理器函数调用 `model.currentDishEffect()`。这使得业务逻辑（详情抓取）完全自动化，无需在 Presenter 中手动触发。

#### 核心实现代码
**resolvePromise 竞态处理逻辑:**
```javascript
function resolvePromise(prms, promiseState) {
    if (!prms) { /* 清空状态 */ return; }
    promiseState.promise = prms;
    // ...
    prms.then(data => {
        if (promiseState.promise === prms) { // 关键：丢弃过期响应
            promiseState.data = data;
        }
    });
}
```

**MobX 副作用安装:**
```javascript
reaction(
    () => reactiveModel.currentDishId, // 探测器
    () => reactiveModel.currentDishEffect() // 处理器
);
```


## 参考链接
- [Canvas 章节: TW2.2](https://canvas.kth.se/courses/59201/modules/items/1360862)
