import { request } from '../../request'
import type { LoginDataType, RegistryDataType } from './type'

export function registry (data: RegistryDataType) {
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
