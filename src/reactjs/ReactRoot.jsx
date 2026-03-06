import React from 'react'
import App from './App.jsx'
import { observer } from "mobx-react-lite";
import { SuspenseView } from "../views/SuspenseView.jsx";

export const ReactRoot = observer(function ReactRoot(props) {
  if (!props.model.ready) {
    return <SuspenseView promise="loading" />;
  }
  
  return (
    <div id="root">
      <App model={props.model} />
    </div>
  )
});
