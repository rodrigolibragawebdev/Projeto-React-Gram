import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// redux - trocar o context
import { Provider } from "react-redux";

// onde guardo os dados do redux? - arquivo unico
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
