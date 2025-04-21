// import React from "react";
// import { Routes, Route } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
const Layout = lazy(() => import("../layouts/index"));
const Home = lazy(() => import("../views/home/index"));
const Interest = lazy(() => import("../views/interest/index"));
const Message = lazy(() => import("../views/message/index"));
const Mine = lazy(() => import("../views/mine/index"));
const PublishDynamic = lazy(() => import("../views/PublishDynamic/index"));

const routes = [
  {
    id: "root",
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
