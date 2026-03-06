# TW3.5 Native tasks (Optional)

## 状态说明
**本项目开发者身份为 ID2216 学生，并非从 DH2642 转修，因此根据课程要求，TW3.5 的额外任务属于可选（Optional）范围。**

为了确保主分支 (`main`) 的代码稳定性及其与 Canvas 自动化测试脚本的 100% 兼容性，本项目在现阶段未物理实现 TW3.5 的功能。所有核心原生开发目标（MVP 架构、MobX 响应式、Firebase 持久化、Tab 导航）已在 TW1-TW3.3 中圆满达成。

---

## 任务内容与实现思路概述

虽然本项目未直接实现，但针对 TW3.5 的各项原生扩展任务，已完成技术审计，思路如下：

### 1. Stack Navigation (10p)
- **思路**：在 `_layout.jsx` 中将 `Tabs` 替换为 `Stack` 布局，或在特定的 Tab 页面内嵌套 `Stack`。
- **关键点**：使用 `router.push('/details')` 时，Stack 导航会自动提供“返回”按钮，比 Tab 切换更符合详情页的交互习惯。

### 2. Landscape Mode (5p)
- **思路**：在 `SummaryView` 挂载时，调用 `ScreenOrientation.lockAsync()`。
- **关键点**：需要处理布局在横屏下的样式适配，例如将纵向列表改为横向多列展示。

### 3. Haptics (5p)
- **思路**：在按钮的 `onPress` 回调中，调用 `Haptics.impactAsync()` 或 `Haptics.notificationAsync()`。
- **关键点**：这能提供物理层面的交互确认，是原生应用区别于 Web 应用的重要特征。

### 4. Expo Checkboxes (5p)
- **思路**：引入 `expo-checkbox` 组件替代原有的文本按钮。
- **关键点**：结合 `LayoutAnimation` 或 `Animated` 库，在勾选删除时实现平滑的淡出动画。

### 5. Modals (5p)
- **思路**：利用 Expo Router 的 Modal 路由功能。
- **关键点**：通过 `router.push('/modal')` 弹出一个半透明覆盖层，用于显示“成功添加”等临时通知。

### 6. Expo Notifications (10p)
- **思路**：调用 `Notifications.requestPermissionsAsync()` 获取权限。
- **关键点**：使用 `scheduleNotificationAsync` 在用户添加菜品后触发一条系统级通知。

---

## 参考链接
- [Canvas 章节: TW3.5](https://canvas.kth.se/courses/59201/modules/items/1367364)


---

⬅️ [上一章: TW3.3](./TW3.3_Navigation.md) | [🏠 回到首页](../../README.md)
