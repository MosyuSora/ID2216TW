# TW3.3 Navigation (Native)

## 问题内容
实现基于 Expo Router 的 Tab 导航系统。
1. 在 `_layout.jsx` 中配置 `Tabs` 路由，包含 Home、Search、Summary、Details 四个 Tab。
2. 创建对应的页面文件 (`index.jsx`, `search.jsx`, `summary.jsx`, `details.jsx`)，并在其中渲染对应的 Presenter。
3. 在 View 层实现交互式导航：
   - `DetailsView`: "Add to Menu" 后返回首页 (`/`)。
   - `SidebarView`: 点击菜品跳转至详情页 (`/details`)。
   - `SearchResultsView`: 点击搜索结果跳转至详情页 (`/details`)。

## 问题 Scope
- [src/app/_layout.jsx](../../ID2216TW/src/app/_layout.jsx)
- [src/app/index.jsx](../../ID2216TW/src/app/index.jsx)
- [src/app/search.jsx](../../ID2216TW/src/app/search.jsx)
- [src/app/summary.jsx](../../ID2216TW/src/app/summary.jsx)
- [src/app/details.jsx](../../ID2216TW/src/app/details.jsx)
- [src/native-views/detailsView.jsx](../../ID2216TW/src/native-views/detailsView.jsx)
- [src/native-views/sidebarView.jsx](../../ID2216TW/src/native-views/sidebarView.jsx)
- [src/native-views/searchResultsView.jsx](../../ID2216TW/src/native-views/searchResultsView.jsx)

## 对应知识点回顾
- [/id2216_tutorials/11_navigation_logic.md](../../ID2216TW/id2216_tutorials/11_navigation_logic.md)
- [Expo Router Tabs Documentation](https://docs.expo.dev/router/advanced/tabs/)

## 解题思路
1. **配置 RootLayout**: 使用 `expo-router` 提供的 `Tabs` 组件替代之前的 `Stack`。根据要求设置 `name` (对应文件名) 和 `options` (包含 `title` 和 `tabBarIcon`)。
2. **创建页面桥接**: 每个页面文件本质上是一个简单的包装器，它从 `mobxReactiveModel.js` 获取响应式模型，并将其作为 prop 传递给现有的 Presenter。
3. **实现程序化导航**: 导入 `router` 对象，在相应的 ACB (Action Callback) 函数中调用 `router.push(path)`。例如在 `DetailsView` 中，在执行原有的 `onAddToMenu` 逻辑后，紧接着执行导航跳转。

### 关键代码段 (app/_layout.jsx)
```javascript
// 使用 Tabs 架构实现底部导航栏
return (
  <Tabs>
    <Tabs.Screen
      name="index"
      options={{
        title: "Home",
        tabBarIcon: () => <Text>🍽</Text>, // 渲染图标的回调
      }}
    />
    {/* 其他 Screen 配置类似 */}
  </Tabs>
);
```

### 关键代码段 (native-views/detailsView.jsx)
```javascript
function addPressedACB() {
    onAddToMenu(); // 执行业务逻辑：添加到菜单
    router.push('/'); // 执行导航逻辑：返回首页
}
```


## 参考链接
- [Canvas 章节: TW3.3](https://canvas.kth.se/courses/59201/modules/items/1360871)
