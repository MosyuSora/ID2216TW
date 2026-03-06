# TW3.5 Native Bonus (Stack Navigation) 解析

## 问题内容
在原有 Tabs 导航的基础上，实现符合 React Native 原生体验的 **Stack Navigation** (堆栈导航)。主要要求包括：
1. 将应用根布局从 `Tabs` 切换为 `Stack`，以支持层级化的页面推栈效果。
2. 为不同页面配置特定的 Header 标题，例如 "Home", "Search Recipes", "Dinner Summary"。
3. 为详情页 (details) 特别配置原生返回按钮标题 ("Back")，并支持系统原生的滑动/按钮返回逻辑。

## 问题 Scope
- [src/app/_layout.jsx](../../ID2216TW/src/app/_layout.jsx) (Line 20-55): 切换根布局为 Stack 并配置各 Screen 属性。

## 对应知识点回顾
- [11_navigation_logic.md](../../id2216_tutorials/11_navigation_logic.md): 解释了 SPA 导航逻辑以及如何在单页应用中模拟多页面跳转体验。

## 解题思路
1. **架构转换**：为了提供更像移动端原生 App 的体验，将根布局组件从 `Tabs` (底部标签栏) 更改为 `Stack` (层级堆栈)。这允许页面像卡片一样叠放，并自动处理物理返回键或手势。
2. **条件渲染与加载**：在布局层监听 `reactiveModel.ready` 状态。在模型未初始化完成前，显示 `ActivityIndicator` (原生加载转圈)，确保应用不会在数据未就绪时崩溃。
3. **Screen 配置**：
    - `name` 属性必须精确对应 `/src/app/` 目录下的文件名（不带扩展名）。
    - 使用 `options` 属性中的 `headerTitle` 或 `title` 来定义顶部导航条显示的文字。
    - 在 `details` 页面，通过 `headerBackTitle` 增强 iOS 端的用户体验，让返回按钮更具描述性。

### 核心代码段

#### _layout.jsx (Stack 路由配置)
```javascript
// src/app/_layout.jsx
import { Stack } from "expo-router"; // 导入堆栈导航组件

function RootLayout() {
  // 处理初始化状态，避免数据闪现
  if (!reactiveModel.ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerTitle: "Dinner Planner", // 全局默认标题
      }}
    >
        <Stack.Screen 
            name="index" // 首页路径
            options={{ title: "Home" }} 
        />
        <Stack.Screen 
            name="search" // 搜索页路径
            options={{ title: "Search Recipes" }} 
        />
        <Stack.Screen 
            name="summary" // 总结页路径
            options={{ title: "Dinner Summary" }} 
        />
        <Stack.Screen 
            name="details" // 详情页路径
            options={{ 
                title: "Dish Details",
                headerBackTitle: "Back" // iOS 原生返回按钮文字
            }} 
        />
    </Stack>
  );
}
```
