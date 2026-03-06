# TW1.5 Presenters handle custom events fired by Views

本章节重点在于实现 **Presenter** 层，使其能够作为 **View**（视图）与 **Model**（模型）之间的桥梁。Presenter 负责订阅 Model 的变化，并将视图触发的自定义事件（Action Callbacks, ACB）转化为对 Model 的状态修改。

### 1. 问题内容
在 `Sidebar` Presenter 中，需要通过 Props 接收 `model`，并实现以下逻辑：
1. **人数变更**：当用户在侧边栏点击 `+` 或 `-` 时，Presenter 应捕获 `onNumberChange` 事件并调用 `model.setNumberOfGuests`。
2. **菜品兴趣**：当用户点击侧边栏中的某个菜品时，Presenter 应捕获 `onDishInterest` 事件，通过 `model.setCurrentDishId` 记录当前查看的菜品 ID（为后续 TW3.3 的导航做准备）。
3. **移除菜品**：当用户点击菜品旁的删除按钮时，Presenter 应捕获 `onDishRemove` 事件并调用 `model.removeFromMenu`。

### 2. 问题 Scope
- [src/reactjs/sidebarPresenter.jsx](../../src/reactjs/sidebarPresenter.jsx)

### 3. 对应知识点回顾
- **ACB (Action-Callback) 模式**：视图不直接操作数据，而是触发回调。
- **MobX Observer**：Presenter 使用 `observer` 包裹，以响应 Model 中被观测属性的变化并重新渲染视图。
- **相关参考资料**：
    - [Canvas TW1.5 页面](https://canvas.kth.se/courses/59201/pages/tw1-dot-5-presenters-handle-custom-events-fired-by-views)
    - [Architecture Overview](../../id2216_tutorials/Architecture_Overview.md)

### 4. 解题思路
Presenter 的核心任务是将**业务逻辑**从视图中抽离。我们定义内部的 ACB 函数来处理视图传回的数据，并调用 Model 的方法。

#### 完整实现代码（含详细注释）：

```javascript
import { SidebarView } from "../views/sidebarView.jsx"; // 导入 Native 视图组件
import { observer } from "mobx-react-lite"; // 引入 MobX 响应式绑定

/**
 * Sidebar Presenter: 负责连接 Model 与 SidebarView
 * 使用 observer 确保当 model.numberOfGuests 或 model.dishes 变化时，视图能自动更新
 */
const Sidebar = observer(
function (props) {
    // 1. 处理人数变更的动作回调 (ACB)
    // View 触发 onNumberChange 时，将新的人数传递给 Model
    function numberChangeACB(newNumber) {
        props.model.setNumberOfGuests(newNumber);
    }

    // 2. 处理菜品兴趣（点击查看详情）
    // 将当前点击的菜品 ID 存入 Model，以便全局共享状态（如在详情页显示）
    function dishInterestACB(dish) {
        props.model.setCurrentDishId(dish.id);
    }

    // 3. 处理移除菜品的动作回调 (ACB)
    // 调用 Model 的从菜单移除逻辑
    function removeDishACB(dish) {
        props.model.removeFromMenu(dish);
    }

    // 渲染视图，并将 Model 的状态与 Presenter 的回调注入 View
    return (
        <SidebarView
            // 状态映射
            number={props.model.numberOfGuests}
            dishes={props.model.dishes}
            
            // 事件映射
            onNumberChange={numberChangeACB}
            onDishInterest={dishInterestACB}
            onDishRemove={removeDishACB}
        />
    );
});

export { Sidebar };
```


## 参考链接
- [Canvas 章节: TW1.5](https://canvas.kth.se/courses/59201/modules/items/1360858)
