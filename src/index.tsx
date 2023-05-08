import React from "react";
import ReactDOM from "react-dom/client";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import {
  CustomBrowserRouter,
  customHistory,
} from "./components/CustomBrowserRouter";
import { AuthProvider } from "react-auth-kit";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider
    authType={"cookie"}
    authName={"auth"}
    cookieDomain={window.location.hostname}
    cookieSecure={false}
    >
      {/* 
// @ts-ignore */}
      <CustomBrowserRouter history={customHistory}>
        <App />
      </CustomBrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
