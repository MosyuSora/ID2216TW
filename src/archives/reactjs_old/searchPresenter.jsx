import React from 'react'
import SearchResultsView from '../views/searchResultsView.jsx'

/**
 * 搜索结果 Presenter (TW2.3.1)
 * 严格使用 PromiseState 模式处理搜索结果的异步加载
 */
export default function SearchPresenter(props) {
  // 从模型中解构搜索参数的 Promise 状态
  const { searchParamsPromiseState } = props.model;
  const { promise, data, error } = searchParamsPromiseState || {};

  // 1. 如果没有 Promise，不渲染或显示提示
  if (!promise) {
    return <div>No search params</div>;
  }
  
  // 2. 加载中状态
  if (!data && !error) {
    return <img src="https://brfenergi.se/iprog/loading.gif" alt="loading" />;
  }
  
  // 3. 错误处理
  if (error) {
    return <div>{error.message || error.toString()}</div>;
  }
  
  // 4. 渲染搜索结果
  if (data) {
    return <SearchResultsView searchResults={data} />;
  }
  
  return null;
}
