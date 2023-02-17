/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 账号
 * @param {*} s
 */
export function isUserName (s) {
  return /^[a-zA-Z0-9_]{8,16}$/.test(s)
}

/**
 * 密码
 * @param {*} s
 */
export function isPassWord (s) {
  return /^[a-zA-Z0-9_]{8,16}$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1(3|4|5|6|7|8|9)\d{9}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /(^([0-9]{3,4}-)?[0-9]{7,8}$)|(^(400)-(\d{3})-(\d{4})(.)(\d{1,4})$)|(^(400)-(\d{3})-(\d{4}$))|(^(400)(\d{3})(\d{4}$))|(^(400)-(\d{4})-(\d{3}$))/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 身份证号码
 * @param {*} s
 */
export function isIdCard (s) {
  return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(s)
}
