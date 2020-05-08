import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import { store } from "./redux";
import App from "./App";
import { getItem, setItem } from "./utils/storage";

const addLS = async () => {
  const todos = await getItem("todos");

  if (!todos) {
    await setItem("todos", []);
  }
};
addLS();
const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
