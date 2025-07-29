// import React from "react";
// import { Routes, Route } from "react-router-dom";
import { createBrowserRouter, RouteObject, redirect } from "react-router-dom";
import { lazy } from "react";
const Login = lazy(() => import("../views/system/login/index"));
const LoginMode = lazy(() => import("../views/system/loginMode/index"));
const Register = lazy(() => import("../views/system/register/index"));
const NotFound = lazy(() => import("../views/system/404/index"));

const Layout = lazy(() => import("../layouts/index"));
const Home = lazy(() => import("../views/home/index"));
const Interest = lazy(() => import("../views/interest/index"));
const Message = lazy(() => import("../views/message/index"));
const Mine = lazy(() => import("../views/mine/index"));
const PublishDynamic = lazy(() => import("../views/PublishDynamic/index"));

const checkAuth = () => {
  // 校验token是否存在
  const token = sessionStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }
  return null;
};

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/loginMode",
    element: <LoginMode />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/",
    element: <Layout />,
    loader: checkAuth,
    children: [
      {
        path: "/Home",
        element: <Home />
      },
      {
        path: "/Interest",
        element: <Interest />
      },
      {
        path: "/Message",
        element: <Message />
      },
      {
        path: "/Mine",
        element: <Mine />
      },
      {
        path: "/PublishDynamic",
        element: <PublishDynamic />,
        handle: {
          isFooter: false
        }
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
];

const AppRoutes = createBrowserRouter(routes);

// const AppRoutes: React.FC = () => {
//   return (
//     <Routes>
//       {routes.map((route, index) => (
//         <Route key={index} path={route.path} element={route.element}>
//           {route.children?.map((child, childIndex) => (
//             <Route key={childIndex} path={child.path} element={child.element} />
//           ))}
//         </Route>
//       ))}
//     </Routes>
//   );
// };

export default AppRoutes;
