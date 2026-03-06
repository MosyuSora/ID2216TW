import React from "react";
import { SidebarView } from "../views/sidebarView.jsx"; // 注意：Native 环境下路由可能需要相对路径或按环境解析
import { observer } from "mobx-react-lite";

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
    // 将当前点击的菜品 ID 存入 Model，以便全局共享状态
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
