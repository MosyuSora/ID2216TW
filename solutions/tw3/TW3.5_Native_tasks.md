# TW3.5 Native tasks for students who took DH2642

## 问题内容
针对已经修过 DH2642 (Web) 的同学，为了进一步掌握 Native 独有概念，需要完成额外的 Native 任务（共 40p，要求至少 30p）。

### 1. Stack Navigation (10p)
- **要求**：在从 `SearchResultsView` 或 `SidebarView` 导航到 `DetailsView` 时，使用 Stack 导航替代简单的 Tab 切换。
- **知识点**：[Expo Stack Router](https://docs.expo.dev/router/advanced/stack/)。

### 2. Landscape Mode (5p)
- **要求**：在 `SummaryView` 中支持横屏显示模式。
- **知识点**：[Expo Screen Orientation](https://docs.expo.dev/versions/latest/sdk/screen-orientation/)。

### 3. Haptics (5p)
- **要求**：为应用中的按钮添加触感反馈（Haptics），并在真机上测试。
- **知识点**：[Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)。

### 4. Expo Checkboxes (5p)
- **要求**：在 `SidebarView` 中，将现有的 "x" 按钮替换为 Expo Checkbox，并添加删除时的动画效果。
- **知识点**：[Expo Checkbox](https://docs.expo.dev/versions/latest/sdk/checkbox/)。

### 5. Modals (5p)
- **要求**：点击 `DetailsView` 中的 "Add to menu" 时，弹出一个 Modal 显示“已添加”提示。
- **知识点**：[Expo Modals](https://docs.expo.dev/router/advanced/modals/)。

### 6. Expo Notifications (10p)
- **要求**：实现简单的本地通知，例如在特定操作后调用 `scheduleNotificationAsync`。需要处理 `requestPermissionsAsync` 权限。
- **知识点**：[Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)。

## 问题 Scope
- [src/app/_layout.jsx](../../ID2216TW/src/app/_layout.jsx)
- [src/native-views/summaryView.jsx](../../ID2216TW/src/native-views/summaryView.jsx)
- [src/native-views/sidebarView.jsx](../../ID2216TW/src/native-views/sidebarView.jsx)
- [src/native-views/detailsView.jsx](../../ID2216TW/src/native-views/detailsView.jsx)

## 对应知识点回顾
- [/id2216_tutorials/11_navigation_logic.md](../../ID2216TW/id2216_tutorials/11_navigation_logic.md)
- [Canvas TW3.5 Page](https://canvas.kth.se/courses/59201/pages/tw3-dot-5-native-tasks-for-students-who-took-dh2642)

## 解题思路 (Audit Mode)
目前该项目处于审计状态，TW3.5 的物理实现应放在独立的分支上，以免干扰主分支的单元测试（单元测试通常不包含这些 Native 扩展功能）。


## 参考链接
- [Canvas 章节: TW3.5](https://canvas.kth.se/courses/59201/modules/items/1367364)
