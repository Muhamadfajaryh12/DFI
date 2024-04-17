import React from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";
import "./index.css";
import store from "./states/store.tsx";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
