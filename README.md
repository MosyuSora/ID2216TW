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
- **Presenter (演示层)**: `src/reactjs/`
  - 充当 Model 与 View 之间的桥梁。

---

## 🚀 快速上手 (Quick Start)

### 1. 安装与启动
```bash
npm install
npx expo start
```

### 2. 运行测试
```bash
npm run test tw1.1   # 运行特定章节测试
npm run test tw3     # 运行全部 TW3 测试
```

---

## 📚 中文友好课程文档 (Learning Resources)

为了帮助开发者快速掌握移动开发核心，我们准备了全套中文教程，深入浅出讲解从 JS 基础到 Native 进阶的知识：

1.  **[环境搭建与准备](./id2216_tutorials/01_setup.md)**：开发工具与 Expo 环境配置。
2.  **[JavaScript 核心与回调](./id2216_tutorials/02_callbacks.md)**：掌握 ACB (Asynchronous Callback) 模式。
3.  **[原生视图渲染](./id2216_tutorials/03_rendering.md)**：React Native 基础组件与样式。
4.  **[MVP 架构入门](./id2216_tutorials/04_mvp_intro.md)**：理解 Model-View-Presenter 的设计精髓。
5.  **[响应式编程](./id2216_tutorials/05_reactivity.md)**：使用 MobX 管理应用状态。
6.  **[异步请求与 API](./id2216_tutorials/06_fetch_async.md)**：Fetch 调用与异步逻辑封装。
7.  **[Suspense 与渲染占位](./id2216_tutorials/07_suspense.md)**：提升用户体验的异步 UI 模式。
8.  **[进阶状态逻辑](./id2216_tutorials/08_state_advanced.md)**：处理复杂的业务流转。
9.  **[Firebase 持久化](./id2216_tutorials/10_firebase_auth.md)**：连接云端数据库 Firestore。
10. **[Expo Router 导航逻辑](./id2216_tutorials/11_navigation_logic.md)**：原生 Stack 与 Tab 导航实现。
11. **[大项目启动指南](./id2216_tutorials/12_project_kickstart.md)**：从 Lab 到 Project 的转型建议。

---

## 🎓 章节通关索引 (Tutorials & Solutions)

本项目将每一个 Tutorial Week 的通关答案与 Canvas 官方要求进行了 1:1 关联，支持代码行号自动跳转。

| 章节 | 通关答案 (Solution) | Canvas 链接 |
| :--- | :--- | :--- |
| **TW1.1** | [Callbacks & MVP](./solutions/tw1/TW1.1_JavaScript_and_Callbacks.md) | [Canvas 1.1](https://canvas.kth.se/courses/59201/modules/items/1360852) |
| **TW1.2.1** | [Bootstrapping](./solutions/tw1/TW1.2.1_Bootstrapping_the_App.md) | [Canvas 1.2.1](https://canvas.kth.se/courses/59201/modules/items/1360853) |
| **TW1.2.2** | [Pass Props](./solutions/tw1/TW1.2.2_Presenters_pass_props_to_Views.md) | [Canvas 1.2.2](https://canvas.kth.se/courses/59201/modules/items/1360854) |
| **TW1.2.3** | [Basic Rendering](./solutions/tw1/TW1.2.3_Basic_Rendering_in_Views.md) | [Canvas 1.2.3](https://canvas.kth.se/courses/59201/modules/items/1360855) |
| **TW1.3** | [Array & Styling](./solutions/tw1/TW1.3_Array_rendering_and_Styling.md) | [Canvas 1.3](https://canvas.kth.se/courses/59201/modules/items/1360856) |
| **TW1.4** | [Handle Events](./solutions/tw1/TW1.4_Handle_native_events_and_fire_custom_events.md) | [Canvas 1.4](https://canvas.kth.se/courses/59201/modules/items/1360857) |
| **TW1.5** | [Presenter Events](./solutions/tw1/TW1.5_Presenters_handle_custom_events_fired_by_Views.md) | [Canvas 1.5](https://canvas.kth.se/courses/59201/modules/items/1360858) |
| **TW1.6** | [Forms & Input](./solutions/tw1/TW1.6_Forms_and_input.md) | [Canvas 1.6](https://canvas.kth.se/courses/59201/modules/items/1360859) |
| **TW2.1** | [Fetching Data](./solutions/tw2/TW2.1_Fetching_data_from_Web_APIs.md) | [Canvas 2.1](https://canvas.kth.se/courses/59201/modules/items/1360861) |
| **TW2.2** | [Resolving Promises](./solutions/tw2/TW2.2_Resolving_promises_in_Application_State_and_Side_effects.md) | [Canvas 2.2](https://canvas.kth.se/courses/59201/modules/items/1360862) |
| **TW2.3.1** | [Suspense Native](./solutions/tw2/TW2.3.1_Suspense_in_Presenters.md) | [Canvas 2.3.1](https://canvas.kth.se/courses/59201/modules/items/1401005) |
| **TW2.4 & 2.5** | [Custom Events](./solutions/tw2/TW2.5_Handle_Custom_Events_in_Presenters.md) | [Canvas 2.5](https://canvas.kth.se/courses/59201/modules/items/1360866) |
| **TW3.1** | [Persistence](./solutions/tw3/TW3.1_Persistence.md) | [Canvas 3.1](https://canvas.kth.se/courses/59201/modules/items/1401003) |
| **TW3.2** | [Platform Specific](./solutions/tw3/TW3.2_Platform_specific_rendering.md) | [Canvas 3.2](https://canvas.kth.se/courses/59201/modules/items/1360870) |
| **TW3.3** | [Navigation](./solutions/tw3/TW3.3_Navigation.md) | [Canvas 3.3](https://canvas.kth.se/courses/59201/modules/items/1360871) |
| **TW3.5** | [Native Tasks (可选)](./solutions/tw3/TW3.5_Native_tasks.md) | [Canvas 3.5](https://canvas.kth.se/courses/59201/modules/items/1367364) |

---

## ⚠️ 开发者笔记

- **代码一致性**：本项目已通过 2026 年 3 月的最新审计，所有代码逻辑与 Canvas 官方要求保持一致。
- **视图目录说明**：请优先关注 `src/native-views/`，这是专门为原生环境优化的视图组件。

---
*Generated with ❤️ by Phoebe (MosaMatrix Assistant)*
