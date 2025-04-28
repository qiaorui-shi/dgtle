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
    account: "16677778888",
    password: "1234561",
    confirmPassword: "123456",
    phone: "16677778888",
    code: undefined
  });

  const changeForm = (filed: string, value: unknown) => {
    updateForm({ ...form, [filed]: value });
  };

  const getCode = async () => {
    const { uuid, img } = await getCaptcha();
    setCodeUrl("data:image/gif;base64," + img);
  };

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      Toast.show("两次密码输入不一致");
      return;
    }
    await register({ ...form });
    navigate("/login");
  };

  useEffect(() => {
    getCode();
  }, []);

  return (
    <div className="page-register">
      <div className="title">
        <h1>注册账号</h1>
      </div>
      <div className="register-phone">
        <Input value={form.phone} type="tel" onChange={(phone: string) => changeForm("phone", phone)} placeholder="输入手机号" />
      </div>
      <div className="register-account">
        <Input value={form.account} type="number" onChange={(account: string) => changeForm("account", account)} placeholder="输入账号" />
      </div>
      <div className="register-password">
        <Input value={form.password} type="password" onChange={(password: string) => changeForm("password", password)} placeholder="输入密码" />
      </div>
      <div className="register-password">
        <Input value={form.confirmPassword} type="password" onChange={(password: string) => changeForm("confirmPassword", password)} placeholder="确认密码" />
      </div>
      <div className="register-code">
        <Input value={form.code} type="number" onChange={(code: number) => changeForm("code", code)} placeholder="验证码" />
        <div className="code-img">
          <img src={codeUrl} alt="" />
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
