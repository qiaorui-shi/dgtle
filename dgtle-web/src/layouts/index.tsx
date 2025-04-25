import React from "react";
import Footer from "./footer/index";
import { Outlet, useMatches } from "react-router-dom";
import "./index.scss";

interface RouterHandle {
  isFooter?: boolean;
  keepAlive?: boolean;
}

const Layout: React.FC = () => {
  // 设置
  const matches = useMatches();
  const lastMatch = matches[matches.length - 1]?.handle as RouterHandle;
  const { isFooter = true } = lastMatch || {};

  return (
    <div className="layout">
      <div className="page">
        <Outlet />
      </div>
      {isFooter && <Footer />}
    </div>
  );
};

export default Layout;
