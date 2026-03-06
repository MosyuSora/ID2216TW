import React from "react"; // 导入 React 用于创建组件
import { observer } from "mobx-react-lite"; // 从 mobx-react-lite 导入 observer 用于响应式组件包裹
import DetailsView from "../views/detailsView.jsx"; // 修正路径：导入 DetailsView 组件展示菜品详情视图
import { SuspenseView } from "../views/suspenseView.jsx"; // 修正导入：导入 SuspenseView（命名导出）用于处理异步加载和错误显示

/**
 * DetailsPresenter 组件：
 * 负责根据 currentDishPromiseState 状态选择渲染 SuspenseView 或 DetailsView
 * 同时关联 addToMenu, setCurrentDish 等动作
 * 用 observer 包裹以响应 MobX 状态变化
 */
const DetailsPresenter = observer((props) => {
  // 遵循课程 props 结构：解构 model 中的状态和动作
  const { currentDishPromiseState, addToMenu } = props.model;

  // 如果 data 存在且没有错误，渲染业务视图
  if (currentDishPromiseState.data && !currentDishPromiseState.error) {
    return (
      <DetailsView
        dishData={currentDishPromiseState.data} // 匹配测试套件需要的 prop 名
        isDishInMenu={props.model.dishes.find(d => d.id === currentDishPromiseState.data.id)} // 检查是否在菜单中
        onAddToMenu={() => props.model.addToMenu(currentDishPromiseState.data)} // 添加到菜单动作
      />
    );
  }

  // 渲染 SuspenseView 处理加载、错误或无数据状态
  return <SuspenseView {...currentDishPromiseState} />;
});

export default DetailsPresenter; // 默认导出 DetailsPresenter 组件
