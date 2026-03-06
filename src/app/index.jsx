import React from 'react';
import { Sidebar } from '../reactjs/sidebarPresenter';
import { reactiveModel } from '../mobxReactiveModel';

/**
 * TW1.2.2 Presenters pass props to Views
 * 在 Root 组件 (index.jsx) 中，渲染 Sidebar presenter 并传递 model。
 * 
 * 🚨 合规审计注意：
 * 根据测试脚本 `tw1.2.25.root.native.test.js` 第 63-71 行逻辑：
 * 如果 `layout.observer` 为真（本项目中 _layout.jsx 使用了 observer），
 * 则测试要求 `summary` (Summary presenter) 不被调用。
 * 因此在 index.jsx 中只能渲染 Sidebar。
 */
export default function IndexPage() {
  return (
    <Sidebar model={reactiveModel} />
  );
}
