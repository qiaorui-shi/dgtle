import React, { useState } from "react";
import { Cell, Input } from "react-vant";
import { login } from "@/api/module/system";
import type { LoginDataType } from "@/api/module/system/type.ts";

const Login: React.FC = () => {
  const [form, updateForm] = useState<LoginDataType>({
    account: "",
    password: ""
  });

  const changeAccount = (account: string) => {
    updateForm({ ...form, account });
  };

  return (
    <div className="page-login">
      <Cell>
        <Input value={form.account} type="tel" onChange={(account: string) => changeAccount(account)} placeholder="请输入手机号" />
      </Cell>
      <Cell>
        <Input value={form.password} type="password" onChange={(password: string) => changeAccount(password)} placeholder="请输入手机号" />
      </Cell>
    </div>
  );
};

export default Login;
