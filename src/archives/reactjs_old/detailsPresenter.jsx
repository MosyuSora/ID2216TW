import React from 'react'
import { observer } from "mobx-react-lite";
import DetailsView from '../views/detailsView.jsx'
import { SuspenseView } from '../views/suspenseView.jsx'

/**
 * 详情页 Presenter (TW2.3.1)
 * 严格使用 PromiseState 模式处理数据加载、错误和空状态
 */
const DetailsPresenter = observer(function DetailsPresenter(props) {
  // 从模型中解构当前菜品的 Promise 状态
  const { currentDishPromiseState } = props.model;
  const { data } = currentDishPromiseState || {};

  // 1. 如果数据尚未就绪 (没有 data)，使用通用的 SuspenseView 处理状态
  if (!data) {
    return <SuspenseView {...currentDishPromiseState} />;
  }
  
  // 2. 数据就绪，渲染视图
  return <DetailsView dishData={data} />;
});

export default DetailsPresenter;
