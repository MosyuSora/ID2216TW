# TW1.2.3 Basic Rendering in Views (Native) 任务分析与上下文检索

## 1. 题目要求分析
本项目要求在 `SummaryView.jsx` 和 `SidebarView.jsx` 中实现基础的 JSX 渲染。

### 1.1 SummaryView (`src/native-views/summaryView.jsx`)
- **任务**：阅读现有代码。该组件应返回一个 `View`，其中包含一个 `Text` 显示人数。
- **结构**：
  ```
  View
  └── Text: "Summary for {props.number} persons"
  ```
- **测试**：Summary View shows the number of people.

### 1.2 SidebarView (`src/native-views/sidebarView.jsx`)
- **任务**：完全替换现有的 stub 代码。
- **结构**：
  ```
  View
  ├── Pressable (role="button", disabled: props.number === 1)
  │   └── Text: "-"
  ├── Text: "{props.number} {props.number > 1 ? 'Guests' : 'Guest'}"
  └── Pressable (role="button")
      └── Text: "+"
  ```
- **核心逻辑**：
  - 使用 `props.number` 显示数值。
  - 条件渲染：根据数值显示 "Guest" 或 "Guests"。
  - 属性绑定：当 `props.number` 为 1 时，减号按钮的 `disabled` 属性应为 `true`。

## 2. 知识点检索
- **React Native 基础组件**：`View`, `Text`, `Pressable`。
- **JSX 语法**：
  - 属性传递：`disabled={props.number === 1}`。
  - 表达式嵌入：`{props.number}`。
  - 条件逻辑：三元运算符 `{props.number > 1 ? 'Guests' : 'Guest'}`。
- **参考资料**：
  - `/id2216_tutorials/03_rendering.md` (渲染基础)
  - `/id2216_tutorials/04_mvp_intro.md` (MVP 结构中的 View 角色)

## 3. 验收标准
- [ ] `npm run test tw1.2.3` 通过（如果有该特定测试集）。
- [ ] 代码中必须使用 `Pressable` 及其 `disabled` 属性。
- [ ] 人数文本必须包含单复数逻辑。
- [ ] 每个组件必须导出为默认导出或指定导出（根据项目架构）。

## 4. 下一步委派指令预览 (Stage B)
将要求子 Agent 根据上述结构和逻辑实现代码，特别强调 Native 组件的使用和空格处理细节（避免 `<someTag> {expr} </someTag>` 产生的额外空格导致测试失败）。
