import React from "react";
// import { BrowserRouter, Router  } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./router/index";
const App: React.FC = () => {
  return (
    // <BrowserRouter>
    //   <AppRoutes />
    // </BrowserRouter>
    RouterProvider({ router: AppRoutes })
  );
};

export default App;
