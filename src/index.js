import React from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import ReactDOM from "react-dom";
import App from "./App";
import { GridProvider } from "./GridContext";
import { createStore } from "redux";
import { Provider } from "react-redux";

function reducer() {
  return {
    count: null
  }
}

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <GridProvider store={store} userid={"hello"}>
        <App />
      </GridProvider>
    </DndProvider>
  </Provider>,
  document.getElementById("root")
);
