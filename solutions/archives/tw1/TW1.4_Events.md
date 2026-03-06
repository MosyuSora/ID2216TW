# TW1.4 Events - 事件处理解析

### 问题内容
在 Sidebar 侧边栏中实现完整的用户交互。包括：
1. **人数调整**：通过 "+" 和 "-" 按钮修改用餐人数。
2. **菜品操作**：点击菜品名称触发“感兴趣”事件，点击 "X" 按钮移除菜品。
3. **技术要求**：遵循 MVP 架构，通过 props 传递回调函数（Custom Events），并在 Native 环境下正确配置 `testID`。

### 问题 Scope
- **视图文件**: [`/src/native-views/sidebarView.jsx`](../../src/native-views/sidebarView.jsx)
- **Presenter**: [`/src/reactjs/sidebarPresenter.jsx`](../../src/reactjs/sidebarPresenter.jsx)

### 对应知识点回顾
- **自定义事件 (Custom Events)**：在 React/Native 中，子组件不直接修改数据，而是通过调用父组件传入的函数（Callback）来通知状态变更。
- **回调命名规范**：
  - `ACB` (Action Callback)：在 Presenter 层处理业务逻辑的函数。
  - `CB` (Callback)：通用的回调处理函数。
- **Pressable 组件**：Native 中处理点击交互的核心组件，比传统的 Button 更具定制性。
- **相关教程**: [`/id2216_tutorials/02_callbacks.md`](../../id2216_tutorials/02_callbacks.md)

### 解题思路
1. **事件链路设计**:
   - **View 层**：捕获原生点击事件（如 `onPress`），并调用对应的 prop 函数（如 `props.onNumberChange`）。
   - **Presenter 层**：定义响应函数（如 `numberChangeACB`），在函数内部调用 Model 的方法（如 `model.setNumberOfGuests`）。
2. **闭包应用**:
   - 在列表渲染 (`renderItem`) 中，每个菜品行都有自己的删除按钮。通过在循环内部定义 `onDishRemoveACB` 闭包，可以轻松获取并传递当前的 `item` 对象。
3. **测试适配**:
   - 为了通过自动化测试，删除按钮必须标记 `testID="sidebar-row-remove"`。

#### 核心实现代码
**SidebarView 交互逻辑:**
```jsx
// 人数增加按钮
<Pressable onPress={() => props.onNumberChange(props.number + 1)}>
    <Text>+</Text>
</Pressable>

// 菜品行交互
function renderDishCB({ item }) {
    return (
        <View>
            {/* 删除按钮 */}
            <Pressable 
                testID="sidebar-row-remove" 
                onPress={() => props.onDishRemove(item)}
            >
                <Text>X</Text>
            </Pressable>
            
            {/* 详情点击 */}
            <Pressable onPress={() => props.onDishInterest(item)}>
                <Text>{item.title}</Text>
            </Pressable>
        </View>
    );
}
```

**SidebarPresenter 逻辑对接:**
```jsx
const Sidebar = observer(function (props) {
    function numberChangeACB(newNumber) {
        props.model.setNumberOfGuests(newNumber);
    }
    
    function removeDishACB(dish) {
        props.model.removeFromMenu(dish);
    }

    return (
        <SidebarView
            number={props.model.numberOfGuests}
            onNumberChange={numberChangeACB}
            onDishRemove={removeDishACB}
            // ...
        />
    );
});
```
