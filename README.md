# 🥘 Dinner Planner - ID2216 Native Project

欢迎来到 **ID2216 (Developing Mobile Applications)** 原生开发项目！这是一个基于 **MVP (Model-View-Presenter)** 架构构建的晚餐规划应用。本项目专注于 React Native 的原生开发特性、响应式状态管理以及 Firebase 云端持久化。

---

## 🏗️ 架构概览 (Architecture)

本项目严格遵循 **MVP** 设计模式，确保业务逻辑与界面展示的深度解耦：

- **Model (模型层)**: `src/DinnerModel.js` & `src/mobxReactiveModel.js`
  - 存储应用状态（如：当前选中的菜品、嘉宾人数）。
  - 使用 **MobX** 实现响应式更新，确保数据变动能即时反映在 UI 上。
- **View (视图层)**: `src/native-views/`
  - 纯粹的 UI 组件，不包含业务逻辑。
  - 通过 Props 接收数据，并通过回调函数（Custom Events）向外发出交互信号。
- **Presenter (演示层)**: `src/reactjs/`
  - 充当 Model 与 View 之间的桥梁。
  - 监听 Model 的变化，将数据处理后传给 View，并处理 View 传回的交互事件。

---

## 🚀 快速上手 (Quick Start)

### 1. 环境准备
确保你已安装 [Node.js](https://nodejs.org/) 以及移动端调试环境（Expo Go 或 模拟器）。

### 2. 安装依赖
在项目根目录下运行：
```bash
npm install
```

### 3. 启动应用
使用 Expo 启动开发服务器：
```bash
npx expo start
```
你可以扫描终端中的二维码在真机上预览，或按下 `i` (iOS) / `a` (Android) 在模拟器中打开。

### 4. 运行测试
本项目包含完整的单元测试，用于验证各个 Tutorial Week 的完成情况：
```bash
npm run test tw1.1   # 运行特定章节测试
npm run test tw3     # 运行全部 TW3 测试
```

---

## 📂 目录指南 (Directory Structure)

```text
.
├── id2216_tutorials/   # 📚 核心知识点教程 (推荐新手必读)
├── solutions/          # 📝 章节通关文档 (包含解题思路与 Canvas 链接)
├── src/
│   ├── app/            # 路由层：定义 Tab 导航与页面入口 (Expo Router)
│   ├── native-views/   # 视图层：原生优化的 React Native 组件
│   ├── reactjs/        # 演示层：连接逻辑与界面的 Presenters
│   ├── persistence/    # 持久化：Firebase/Firestore 配置与逻辑
│   ├── DinnerModel.js  # 模型层：核心业务逻辑
│   └── apiConfig.js    # 配置：API 密钥与基础路径
└── archives/           # 📦 历史冗余文件归档
```

---

## 🎓 教程与答案目录 (Tutorials & Solutions)

本项目将官方教程与对应的通关答案进行了 1:1 关联，方便新手循序渐进学习。

| 章节 | 核心教程 (Tutorial) | 通关答案 (Solution) |
| :--- | :--- | :--- |
| **TW1.1** | [JavaScript 核心与回调](./id2216_tutorials/01_js_callbacks.md) | [Callbacks & MVP](./solutions/tw1/TW1.1_JavaScript_and_Callbacks.md) |
| **TW1.2.1** | [环境搭建与 App 启动](./id2216_tutorials/02_rendering_native.md) | [Bootstrapping](./solutions/tw1/TW1.2.1_Bootstrapping_the_App.md) |
| **TW1.2.2** | [Presenter 传递 Props](./id2216_tutorials/02_rendering_native.md) | [Pass Props](./solutions/tw1/TW1.2.2_Presenters_pass_props_to_Views.md) |
| **TW1.2.3** | [基础 View 渲染](./id2216_tutorials/02_rendering_native.md) | [Basic Rendering](./solutions/tw1/TW1.2.3_Basic_Rendering_in_Views.md) |
| **TW1.3** | [数组渲染与样式](./id2216_tutorials/03_array_rendering_native.md) | [Array & Styling](./solutions/tw1/TW1.3_Array_rendering_and_Styling.md) |
| **TW1.4** | [原生事件处理](./id2216_tutorials/04_native_events.md) | [Handle Events](./solutions/tw1/TW1.4_Handle_native_events_and_fire_custom_events.md) |
| **TW1.5** | [Presenter 处理事件](./id2216_tutorials/05_presenter_logic_native.md) | [Presenter Events](./solutions/tw1/TW1.5_Presenters_handle_custom_events_fired_by_Views.md) |
| **TW2.1** | [API 调用与 Promises](./id2216_tutorials/06_api_promises.md) | [Fetching Data](./solutions/tw2/TW2.1_Fetching_data_from_Web_APIs.md) |
| **TW2.2** | [副作用 (Side Effects)](./id2216_tutorials/07_side_effects.md) | [Resolving Promises](./solutions/tw2/TW2.2_Resolving_promises_in_Application_State_and_Side_effects.md) |
| **TW2.3.1** | [Presenter 中的 Suspense](./id2216_tutorials/08_suspense_native.md) | [Suspense Native](./solutions/tw2/TW2.3.1_Suspense_in_Presenters.md) |
| **TW2.4 & 2.5** | [复杂组件交互](./id2216_tutorials/09_complex_views_native.md) | [Custom Events](./solutions/tw2/TW2.5_Handle_Custom_Events_in_Presenters.md) |
| **TW3.1** | [Firebase/Firestore 持久化](./id2216_tutorials/10_persistence.md) | [Persistence](./solutions/tw3/TW3.1_Persistence.md) |
| **TW3.2** | [平台适配渲染](./id2216_tutorials/11_navigation_logic.md) | [Platform Specific](./solutions/tw3/TW3.2_Platform_specific_rendering.md) |
| **TW3.3** | [Expo Router 导航](./id2216_tutorials/11_navigation_logic.md) | [Navigation](./solutions/tw3/TW3.3_Navigation.md) |
| **TW3.5** | - | [Native Tasks (可选)](./solutions/tw3/TW3.5_Native_tasks.md) |

---

## ⚠️ 开发者笔记

- **代码一致性**：本项目已通过 2026 年 3 月的最新审计，所有代码逻辑与 Canvas 官方要求保持一致。
- **视图目录说明**：请优先关注 `src/native-views/`，这是专门为原生环境优化的视图组件，也是测试脚本主要检查的对象。
- **学术诚信**：本项目代码仅供学习参考。请遵循 KTH 的学术诚信准则。

---

## 🔗 相关资源

- [Canvas 课程页面](https://canvas.kth.se/courses/59201)
- [React Native 官方文档](https://reactnative.dev/docs/getting-started)
- [Expo Router 导航指南](https://docs.expo.dev/router/introduction/)

---
*Generated with ❤️ by Phoebe (MosaMatrix Assistant)*
