# 05 - 响应式原理：让数据“活”起来 ⚡

> 上一站: [04_mvp_intro.md](./04_mvp_intro.md) - MVP 架构  
> 下一站: [06_fetch_async.md](./06_fetch_async.md) - 异步 Fetch

---

## 🌞 引言：观察者模式

在上一章的 MVP 架构中，我们遇到了一个问题：当 **Model** 中的数据发生变化时，**View** 是如何知道并自动更新的？

这就是 **响应式 (Reactivity)** 的核心。在 ID2216 中，我们主要使用 **观察者模式 (Observer Pattern)**。

### 生活类比：订阅报纸 📰
1. **报社 (Subject/Model)**: 负责产生新闻（数据）。
2. **读者 (Observer/Presenter)**: 订阅报纸。
3. **分发过程**: 每当报社有新报纸，就会挨家挨户送到订阅者手中。

---

## 🏗️ 手动实现：窥探底层机制

在纯 JavaScript 中实现一个简单的响应式模型：

```javascript
const model = {
    observers: [], // 订阅者名单
    data: { counter: 0 },
    
    // 1. 添加订阅者
    addObserver(callback) {
        this.observers.push(callback);
    },
    
    // 2. 移除订阅者
    removeObserver(callback) {
        this.observers = this.observers.filter(obs => obs !== callback);
    },
    
    // 3. 通知所有订阅者
    notifyObservers() {
        this.observers.forEach(callback => {
            try { callback(); } catch(e) { console.error(e); }
        });
    },

    // 业务方法
    increment() {
        this.data.counter++;
        this.notifyObservers(); // 状态改变后自动通知，封装在 Model 内部
    }
};
```

### ⚠️ 封装性提醒

不要在 Presenter 外部手动调用 `notifyObservers()`。

#### ❌ 错误的做法
```javascript
model.data.counter++; 
model.notifyObservers(); 
```

#### ✅ 正确的做法
```javascript
model.increment(); // 让 Model 自己决定什么时候通知
```

---

## ⚛️ 结合 React 的 Presenter

在 React 中，我们利用 `useEffect` 来建立这种订阅关系。

```jsx
// React Presenter 中的订阅逻辑
import { useState, useEffect } from 'react';

function MyPresenter({ model }) {
    // 使用本地 state 来触发重新渲染
    const [data, setData] = useState(model.data);

    useEffect(() => {
        // 定义一个“通知我”时的操作
        function update() {
            setData({ ...model.data }); // 触发 React 重新渲染
        }

        model.addObserver(update); // 挂载时订阅
        
        return () => {
            model.removeObserver(update); // 卸载时取消订阅（防止内存泄漏）
        };
    }, [model]); // 依赖 model 实例

    return <MyView data={data} onIncrement={() => model.increment()} />;
}
```

---

## 📊 生命周期与更新流

```mermaid
graph TD
    A[Component Mount] --> B[useEffect called]
    B --> C[model.addObserver]
    
    subgraph Update Cycle
        D[User Interaction] --> E[model.method]
        E --> F[data updated]
        F --> G[model.notifyObservers]
        G --> H[setState in Presenter]
        H --> I[Re-render View]
    end
    
    C --> Update Cycle
    
    J[Component Unmount] --> K[useEffect Cleanup]
    K --> L[model.removeObserver]
```

---

## 🛠️ 实战练习：计数器模型

尝试实现一个具有“重置”功能的 Model：

```javascript
const counterModel = {
    observers: [],
    count: 0,
    
    addObserver(cb) { this.observers.push(cb); },
    removeObserver(cb) { this.observers = this.observers.filter(o => o !== cb); },
    notifyObservers() { this.observers.forEach(cb => cb()); },

    increment() {
        this.count++;
        this.notifyObservers();
    },
    
    reset() {
        this.count = 0;
        this.notifyObservers(); // 思考：如果漏了这一行会怎样？
    }
};
```

---

## 🔍 调试指南：Console.log 追踪

如果你发现 UI 不更新，可以尝试：

1. **追踪订阅**: 在 `addObserver` 里 log 订阅者。
2. **追踪通知**: 在 `notifyObservers` 里 log 订阅者列表长度。

**常见问题**:
- `Notifying 0 observers`: 忘记在 Presenter 里调用 `addObserver`。
- `Notifying 50 observers`: 忘记写 `useEffect` 的清理函数，导致重复订阅。

---

## 💡 TA 问答

**Q: React 已经有 State 了，为什么还要在 Model 里写订阅者模式？**

> **TA**: 因为 Model 是**纯 JavaScript**，它不依赖 React。这样你的业务逻辑可以独立存在，方便测试和复用。React 只负责“展示”这个 Model 的状态。

---

**剧透预警**：目前我们的 Model 数据都是本地写死的。下一章，我们将学习如何优雅地处理 **网络请求 (Fetch)**，并将其接入响应式流！

**下一站**: [06_fetch_async.md](./06_fetch_async.md) - 异步 Fetch
