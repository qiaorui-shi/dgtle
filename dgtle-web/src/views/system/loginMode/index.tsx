import React from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    window.location.href = "http://localhost:3000/api/auth/github";
  };

  return (
    <div className="page-login">
      <div className="title">
        <h1>其它登录方式</h1>
      </div>
      <div className="btn-list">
        <div className="github-btn" onClick={handleLogin}>
          github登录
        </div>
      </div>
    </div>
  );
};

export default Login;
