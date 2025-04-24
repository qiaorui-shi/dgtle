// import React from "react";
// import { Routes, Route } from "react-router-dom";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { lazy } from "react";
const Login = lazy(() => import("../views/system/login/index"));
const NotFound = lazy(() => import("../views/system/404/index")); // 404 页面组件，按需引入，减少首屏加载时间，优化用户体验。 也可以使用 react-err

const Layout = lazy(() => import("../layouts/index"));
const Home = lazy(() => import("../views/home/index"));
const Interest = lazy(() => import("../views/interest/index"));
const Message = lazy(() => import("../views/message/index"));
const Mine = lazy(() => import("../views/mine/index"));
const PublishDynamic = lazy(() => import("../views/PublishDynamic/index"));

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <Layout />,
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
