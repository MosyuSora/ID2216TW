# ID2216 TW3.2 Platform-specific rendering 解析文档

## 问题内容
在 React Native 应用中，为了匹配不同平台的原生设计模式（Native Feel），需要根据运行平台应用不同的样式。
具体要求：
1. 创建 `getCardStyle()` 函数，根据 `Platform.OS` 返回样式：
   - **iOS**: 返回细微边框 (`borderWidth`, `borderColor`)。
   - **Android**: 返回阴影/海拔效果 (`boxShadow`)。
   - **Web**: 返回较深的边框和阴影。
2. 将该样式应用到所有卡片类视图中：`DetailsView`, `SearchResultsView`, `SidebarView`, `SummaryView`。

## 问题 Scope
- [cardStyle.js](../../src/native-views/cardStyle.js)
- [detailsView.jsx](../../src/native-views/detailsView.jsx)
- [searchResultsView.jsx](../../src/native-views/searchResultsView.jsx)
- [sidebarView.jsx](../../src/native-views/sidebarView.jsx)
- [summaryView.jsx](../../src/native-views/summaryView.jsx)

## 对应知识点回顾
- [Platform-specific rendering (Native)](https://canvas.kth.se/courses/59201/pages/tw-3-dot-2-platform-specific-rendering-native?module_item_id=1360870)
- [React Native Platform Module](https://reactnative.dev/docs/platform-specific-code#platform-module)

## 解题思路
### 1. 样式抽象
通过 `react-native` 提供的 `Platform` 模块，我们可以轻松检测当前运行环境。为了保证 DRY (Don't Repeat Yourself) 原则，我们将平台差异化逻辑封装在 `cardStyle.js` 中。

```javascript
// src/native-views/cardStyle.js
import { Platform } from 'react-native';

export function getCardStyle() {
    if (Platform.OS === 'ios') {
        return {
            borderWidth: 1,
            borderColor: '#ddd',
        };
    } else if (Platform.OS === 'android') {
        return {
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

### 2. 样式应用
在 View 组件中，我们使用展开运算符 `...getCardStyle()` 将返回的对象并入 `StyleSheet` 定义中。这种方式既保持了组件的整洁，又实现了跨平台的原生体验。

以 `DetailsView` 为例：
```jsx
const styles = StyleSheet.create({
    card: {
        ...getCardStyle(), // 展开平台特定样式
        padding: 10,
        backgroundColor: 'white',
    },
});
```
