import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./assets/css/responsive.css";
import "./assets/css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from "react-redux";
import  store from "./app/store.js";
// const basename = import.meta.env.VITE_BASENAME;

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="457098433732-a9unkufq87phpjpjmm2qgq57lp2q482m.apps.googleusercontent.com">
      <BrowserRouter basename="/mental_wellness_web/" >
        <App />
      </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);