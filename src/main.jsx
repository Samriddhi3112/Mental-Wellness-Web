import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./assets/css/responsive.css";
import "./assets/css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from "react-redux";
import  store from "./app/store.js";
// const basename = import.meta.env.VITE_BASENAME;

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/mental_wellness_web/" >
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);