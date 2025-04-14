import React from 'react'
import Footer from './footer/index'
import { Outlet } from 'react-router-dom'
import './index.scss'

const Layout: React.FC = () => {
  return (
    <div className='layout'>
      <div className='content'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
