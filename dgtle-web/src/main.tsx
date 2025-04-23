import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "tailwindcss/index.css";
import "./styles/var.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // 生产用
  <React.Fragment>
    <App />
  </React.Fragment>
  // 开发环境用 严格模式会对函数组件副作用运行两次
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);
