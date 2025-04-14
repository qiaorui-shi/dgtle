import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../layouts/index.tsx'
import Home from '../views/home/index'
import Interest from '../views/interest/index'
import Message from '../views/message/index'
import Mine from '../views/mine/index'

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/Interest', element: <Interest /> },
      { path: '/Message', element: <Message /> },
      { path: '/Mine', element: <Mine /> }
    ]
  }
]

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
          {route.children?.map((child, childIndex) => (
            <Route key={childIndex} path={child.path} element={child.element} />
          ))}
        </Route>
      ))}
    </Routes>
  )
}

export default AppRoutes
