# TW1.2.1 Rendering 章节初始化 (Native)

## 问题内容
初始化应用架构。具体要求如下：
1. 在 `src/mobxReactiveModel.js` 中，使用 MobX 的 `observable` 函数将 `DinnerModel` 转换为响应式模型。
2. 在 `src/app/index.jsx` (应用的根页面) 中，渲染 `Sidebar` Presenter，并将其 `model` 属性指向生成的 `reactiveModel`。
3. 确保符合 Native 开发环境下的目录结构与合规性要求（根据测试脚本，根页面仅渲染 Sidebar）。

## 问题 Scope
- [src/mobxReactiveModel.js](../../src/mobxReactiveModel.js) (Line 1-35)
- [src/app/index.jsx](../../src/app/index.jsx) (Line 1-19)

## 对应知识点回顾
- [03_rendering.md](../../id2216_tutorials/03_rendering.md): 讨论了 React/Expo 项目的渲染机制。
- [05_reactivity.md](../../id2216_tutorials/05_reactivity.md): 讨论了 MobX 响应式状态管理及 `observable` 的用法。

## 解题思路
本题是整个 TW1.2 Rendering 章节的基石。在 Native 开发中，根路径 `index.jsx` 负责协调顶层组件。

1. **响应式转换**：通过 `observable(model)`，MobX 会劫持模型属性，使得任何对属性的修改都能被观察者监听到。
2. **挂载根组件**：
   - 导入 `reactiveModel`。
   - 导入 `Sidebar` Presenter。
   - 渲染时，将模型作为 Prop 传递。
3. **合规性处理**：测试脚本 `tw1.2.25` 对 `layout` 的状态有特定判断。在本审计分支中，遵循 "Root strictly renders Sidebar" 准则以确保测试 100% 通过。

### 最终代码实现

**src/mobxReactiveModel.js**
```javascript
import { observable, reaction } from "mobx"; // 引入 MobX 的 observable 和 reaction 函数
import { model } from "/src/DinnerModel"; // 从指定路径引入原始模型对象
// ... 其他引入

/**
 * TW1.2.1 响应式模型构建
 * 使用 MobX 的 observable 将普通的 model 对象转换为响应式对象。
 */
function makeReactiveModel(model) {
    return observable(model); // 将模型对象包装为 MobX 的响应式 observable
}

// 在模块加载时立即创建响应式实例
const reactiveModel = makeReactiveModel(model);

// ... 副作用注册

export { makeReactiveModel, reactiveModel };
```

**src/app/index.jsx**
```javascript
import React from 'react';
import { Sidebar } from '../reactjs/sidebarPresenter';
import { reactiveModel } from '../mobxReactiveModel';

/**
 * TW1.2.2 Root 组件挂载
 * 渲染 Sidebar presenter 并传递响应式 model。
 */
export default function IndexPage() {
  return (
    <Sidebar model={reactiveModel} />
  );
}
```


## 参考链接
- [Canvas 章节: TW1.2.1](https://canvas.kth.se/courses/59201/modules/items/1360853)
