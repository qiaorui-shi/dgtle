import React, { useState } from "react";
import { Input } from "react-vant";
import "./index.scss";
import { login } from "@/api/module/system";
import type { LoginDataType } from "@/api/module/system/type.ts";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, updateForm] = useState<LoginDataType>({
    account: "16677778888",
    password: "123456"
  });

  const changeForm = (filed: string, value: string) => {
    updateForm({ ...form, [filed]: value });
  };

  const handleLogin = async () => {
    const { account, password } = form;
    const { token = "" } = await login({ account, password });
    if (token) {
      localStorage.setItem("token", token);
      navigate("/home");
    }
  }; // 登录逻辑，调用接口，获取dat

  return (
    <div className="page-login">
      <div className="title">
        <h1>账号登录</h1>
      </div>
      <div className="login-account">
        <Input value={form.account} type="tel" onChange={(account: string) => changeForm("account", account)} placeholder="输入账号" />
      </div>
      <div className="login-password">
        <Input value={form.password} type="password" onChange={(password: string) => changeForm("password", password)} placeholder="输入密码" />
      </div>
      <div className="footer">
        <button
          className="btn"
          onClick={() => {
            handleLogin();
          }}
        >
          登录
        </button>
        <div className="other">选择其它登录方式</div>
      </div>
    </div>
  );
};

export default Login;
