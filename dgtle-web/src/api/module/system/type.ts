export interface RegisterDataType {
  account: string;
  phone: string;
  password: string;
  confirmPassword: string;
  code?: number; // 验证码
}

export interface LoginDataType {
  account: string;
  password: string;
}
