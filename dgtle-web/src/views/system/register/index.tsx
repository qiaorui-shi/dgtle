import React, { useState, useEffect } from "react";
import { Input, Toast } from "antd-mobile";
import "./index.scss";
import { getCaptcha, register } from "@/api/module/system";
import type { RegisterDataType } from "@/api/module/system/type.ts";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [codeUrl, setCodeUrl] = useState<string>("");
  const [form, updateForm] = useState<RegisterDataType>({
    username: "16677778888",
    password: "123456",
    confirmPassword: "123456",
    phone: "16677778888",
    code: undefined,
    uuid: undefined
  });

  const changeForm = (filed: string, value: unknown) => {
    updateForm({ ...form, [filed]: value });
  };

  const getCode = async () => {
    const { uuid, img } = await getCaptcha();
    setCodeUrl(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(img)}`);
    changeForm("uuid", uuid);
  };

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      Toast.show("两次密码输入不一致");
      return;
    }
    await register({ ...form });
    Toast.show("注册成功");
    setTimeout(() => {
      navigate("/login");
    }, 500); // 1s 后跳转到登录页面
  };

  useEffect(() => {
    getCode();
  }, []);

  return (
    <div className="page-register">
      <div className="title">
        <h1>注册账号</h1>
      </div>
      <div className="register-username">
        <Input value={form.username} onChange={(username: string) => changeForm("username", username)} placeholder="输入用户名" />
      </div>
      <div className="register-phone">
        <Input value={form.phone} type="tel" onChange={(phone: string) => changeForm("phone", phone)} placeholder="输入手机号" />
      </div>
      <div className="register-password">
        <Input value={form.password} type="password" onChange={(password: string) => changeForm("password", password)} placeholder="输入密码" />
      </div>
      <div className="register-password">
        <Input value={form.confirmPassword} type="password" onChange={(password: string) => changeForm("confirmPassword", password)} placeholder="确认密码" />
      </div>
      <div className="register-code">
        <Input value={form.code} onChange={(code: string) => changeForm("code", code)} placeholder="验证码" />
        <div className="code-img">
          <img src={codeUrl} onClick={getCode} />
        </div>
      </div>
      <div className="footer">
        <button
          className="btn"
          onClick={() => {
            handleRegister();
          }}
        >
          注册
        </button>
      </div>
    </div>
  );
};

export default Login;
