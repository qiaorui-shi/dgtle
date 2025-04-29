export interface RegisterDataType {
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
  code?: string; // 验证码
  uuid?: string; // 验证码uuid
}

export interface LoginDataType {
  phone: string;
  password: string;
}
