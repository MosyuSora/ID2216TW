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

## 🎓 学习路径 (Tutorial Progress)

本项目分为三个主要的教学周，你可以在 `solutions/` 文件夹中找到详细的审计报告：

1.  **[TW1: 基础与回调](./solutions/tw1/)**: JavaScript 核心、JSX 初探、MVP 入门。
2.  **[TW2: 异步与副作用](./solutions/tw2/)**: Fetch API、Promises 处理、Suspense 模式。
3.  **[TW3: 持久化与导航](./solutions/tw3/)**: Firestore 云存储、Expo Router 导航、平台适配。

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
