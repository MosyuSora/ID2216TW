import React from "react"; // 导入 React 用于创建组件
import { observer } from "mobx-react-lite"; // 导入 observer 用于响应 MobX 状态变化的组件
import SearchResultsView from "../views/searchResultsView.jsx"; // 修正路径：导入搜索结果视图组件
import { SuspenseView } from "../views/suspenseView.jsx"; // 修正导入：导入 SuspenseView（命名导出）用于异步加载和错误处理

/**
 * SearchPresenter 组件：
 * 根据 searchParamsPromiseState 状态选择渲染 SuspenseView 或 SearchResultsView
 * 通过 observer 包裹实现响应状态变化
 */
const SearchPresenter = observer((props) => {
  // 解构 model 中的搜索相关状态
  const { searchParamsPromiseState } = props.model;

  // 数据存在且无错误时渲染业务视图 SearchResultsView
  if (searchParamsPromiseState.data && !searchParamsPromiseState.error) {
    return (
      <SearchResultsView
        searchResults={searchParamsPromiseState.data} // 匹配测试套件需要的 prop 名
        onSearchClick={(id) => props.model.setCurrentDish(id)} // 触发搜索点击动作
      />
    );
  }

  // 渲染 SuspenseView 处理加载、错误或无数据状态
  return <SuspenseView {...searchParamsPromiseState} />;
});

export default SearchPresenter; // 默认导出 SearchPresenter 组件
