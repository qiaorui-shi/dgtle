import { request } from '../../request'
import type { LoginDataType, RegisterDataType } from './type'

export function register (data: RegisterDataType) {
  return request<void>({
    url: '/user/registry',
    method: 'post',
    data
  })
}

export function login (data: LoginDataType) {
  return request<{ token: string }>({
    url: '/user/login',
    method: 'post',
    data
  })
}
