import React from 'react'
import App from './App.jsx'

/**
 * React 根组件 (TW2.3.1)
 * 将 App 包裹在 id="root" 的 div 中以符合测试要求
 */
export default function ReactRoot(props) {
  return (
    <div id="root">
      <App model={props.model} />
    </div>
  )
}
