import { httpGet, httpPost } from '@/api'

export const loginIn = (params) => httpPost('/login', params) // 登陆

export const register = (params) => httpPost('/register', params) // 注册

export const forget = (params) => httpPost('/getPwd', params) // 找回密码

export const getMsCaptcha = (params) => httpPost('/authorizationCode', params) // 获取墨水授权码

export const vipRegister = (params) => httpPost('/registerVip', params) // 会员注册

export const getUserInfo = (params) => httpGet('/getUserInfo', params) // 获取用户信息

export const getEmailCaptcha = (params) => httpGet('/getEmailCode', params) // 获取邮箱验证码
