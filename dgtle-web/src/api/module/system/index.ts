import { request } from "../../request";
import type { LoginDataType, RegisterDataType } from "./type";

export function getCaptcha() {
  return request<{ uuid: string; img: string }>({
    url: "/auth/captcha",
    method: "get"
  });
}

export function register(data: RegisterDataType) {
  return request<void>({
    url: "/auth/registry",
    method: "post",
    data
  });
}

export function login(data: LoginDataType) {
  return request<{ token: string; userInfo: unknown }>({
    url: "/auth/login",
    method: "post",
    data
  });
}
