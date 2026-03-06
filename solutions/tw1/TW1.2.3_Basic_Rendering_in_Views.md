# TW1.2.3 Basic Rendering in Views (Native)

## 问题内容
本章节要求在 React Native (Native) 环境下实现基础的 JSX 渲染逻辑：
1. **SummaryView 审计**：验证 `src/native-views/summaryView.jsx` 是否能够正确接收 `people` (人数) 和 `ingredients` (食材数组) props，并渲染出符合 "Summary for {number} persons:" 格式的标题。
2. **SidebarView 审计**：验证 `src/native-views/sidebarView.jsx` 是否渲染了人数控制 UI。包括两个 Pressable 按钮（显示 "-" 和 "+"）以及中间的文本。
3. **条件渲染**：
   - 按钮禁用：当人数为 1 时，"-" 按钮必须处于 `disabled` 状态。
   - 文本复数处理：根据人数显示 "Guest" 或 "Guests"（SummaryView 中为 "person" 或 "persons"）。

## 问题 Scope
- [summaryView.jsx](../../src/native-views/summaryView.jsx)
- [sidebarView.jsx](../../src/native-views/sidebarView.jsx)

## 对应知识点回顾
- [03_rendering.md](../../id2216_tutorials/03_rendering.md): JSX 基础语法、条件渲染（三元运算符、逻辑与）、列表渲染（key 的使用）。
- [Canvas: TW1.2.3 Basic Rendering in Views (Native)](https://canvas.kth.se/courses/59201/pages/tw1-dot-2-3-basic-rendering-in-views-native?module_item_id=1360855)

## 解题思路

### 1. SummaryView 渲染
View 作为一个被动的“投影”，接收来自 Presenter 的数据。在 Native 中，我们使用 `<View>` 代替 `<div>`，`<Text>` 代替 `<p>` 或 `<span>`。
标题部分的条件渲染逻辑如下：
```jsx
<Text style={styles.header}>
    Summary for {props.people} {props.people === 1 ? 'person' : 'persons'}:
</Text>
```
*注意：Canvas 明确要求文本末尾有冒号 `:` 以匹配单元测试。*

### 2. SidebarView 人数控制
Sidebar 需要实现一个计数器界面。核心在于 `disabled` 属性的布尔逻辑判定：
```jsx
/* 每行代码已附带中文注释 */
<View style={styles.controls}>
    {/* 减号按钮：当人数小于等于 1 时禁用，防止人数变成负数或 0 */}
    <Pressable role="button" disabled={props.number <= 1} style={styles.controlBtn} onPress={minusACB}>
        <Text>-</Text>
    </Pressable>
    
    {/* 人数显示：使用三元运算符处理 Guest/Guests 的单复数 */}
    <Text style={styles.guestText}>{props.number} {props.number > 1 ? 'Guests' : 'Guest'}</Text>
    
    {/* 加号按钮 */}
    <Pressable role="button" style={styles.controlBtn} onPress={plusACB}>
        <Text>+</Text>
    </Pressable>
</View>
```

### 3. 审计结论
经过主 Agent 亲自执行 `npm run test tw1.2.3`，所有 6 项测试均已通过（Pass）。代码实现严格遵循了 `/id2216_tutorials/03_rendering.md` 中的“影子理论”与“条件渲染”规范，未使用任何超纲 API。


## 参考链接
- [Canvas 章节: TW1.2.3](https://canvas.kth.se/courses/59201/modules/items/1360855)


---

⬅️ [上一章: TW1.2.2](./TW1.2.2_Presenters_pass_props_to_Views.md) | [🏠 回到首页](../../README.md) | [下一章: TW1.3](./TW1.3_Array_rendering_and_Styling.md) ➡️
