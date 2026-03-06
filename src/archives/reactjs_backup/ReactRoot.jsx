import React from 'react'
import App from './App.jsx'

export default function ReactRoot(props) {
  return (
    <div id="root">
      <App model={props.model} />
    </div>
  )
}
