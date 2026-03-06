# TW3.2 平台差异化渲染 (Platform-specific Rendering)

在本章节中，我们实现了 React Native 应用在不同平台（iOS、Android、Web）上的差异化样式渲染，特别是针对卡片容器的视觉反馈进行了适配。

## 问题内容

1.  **创建通用样式函数**：在 `native-views/cardStyle.js` 中实现 `getCardStyle()` 函数。
    *   **iOS**: 使用浅灰色边框 (`borderWidth: 1`, `borderColor: '#ddd'`)。
    *   **Android**: 使用阴影效果 (`boxShadow`)。
    *   **Web/其他**: 结合边框和阴影，提供更明显的层级感。
2.  **应用样式**：将该样式函数应用到四个核心视图组件中：
    *   `SearchResultsView`: 搜索结果的每一项。
    *   `SidebarView`: 侧边栏的每一行。
    *   `SummaryView`: 食材清单的每一行。
    *   `DetailsView`: 详情页中的食材行。

## 问题 Scope

*   [`/src/native-views/cardStyle.js`](../src/native-views/cardStyle.js): 实现平台检测与样式导出逻辑。
*   [`/src/native-views/searchResultsView.jsx`](../src/native-views/searchResultsView.jsx): 在 `Pressable` 容器中注入动态样式。
*   [`/src/native-views/sidebarView.jsx`](../src/native-views/sidebarView.jsx): 为菜单行添加平台适配样式。
*   [`/src/native-views/summaryView.jsx`](../src/native-views/summaryView.jsx): 为食材汇总行添加平台适配样式。
*   [`/src/views/detailsView.jsx`](../src/views/detailsView.jsx): 为详情页食材行添加平台适配样式。

## 对应知识点回顾

*   **React Native Platform API**: [`Platform.OS`](https://reactnative.dev/docs/platform) 用于检测当前运行环境。
*   **Dynamic Styling**: 通过数组语法 `style={[styles.static, getDynamicStyle()]}` 合并静态与动态样式。
*   **Cross-platform Design**: 理解不同平台对于“深度（Depth）”表达的惯用手法（iOS 偏向线框，Android 偏向阴影）。

## 解题思路

### 1. 样式逻辑实现
我们利用 `Platform.OS` 来分支逻辑。对于 Android，React Native 在较新版本中支持 `boxShadow` 属性（或通过 `elevation` 实现），此处遵循课程要求使用 `boxShadow` 字符串描述。

```javascript
import { Platform } from 'react-native';

export function getCardStyle() {
    // 检查当前运行平台
    if (Platform.OS === 'ios') {
        return {
            borderWidth: 1,
            borderColor: '#ddd', // iOS 习惯用细边框区分层级
        };
    } else if (Platform.OS === 'android') {
        return {
            // Android 习惯用阴影表达海拔
            boxShadow: '0px 2px 3.84px rgba(0,0,0,0.25)',
        };
    } else {
        return {
            borderWidth: 1,
            borderColor: '#ccc',
            boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
        };
    }
}
```

### 2. 视图组件集成
在各个视图中，我们导入 `getCardStyle` 并将其结果展开或放入样式数组。以 `SearchResultsView` 为例：

```javascript
// 导入样式工具
import { getCardStyle } from "./cardStyle";

// ... 在渲染函数内部
<Pressable 
    onPress={onPressACB} 
    style={[styles.itemContainer, getCardStyle()]} // 合并本地样式与平台特定样式
>
    {/* 内容 */}
</Pressable>
```

这种模式确保了代码的高度可维护性：如果未来需要调整全平台的卡片视觉风格，只需修改 `cardStyle.js` 一个文件即可。


## 参考链接
- [Canvas 章节: TW3.2](https://canvas.kth.se/courses/59201/modules/items/1360870)
