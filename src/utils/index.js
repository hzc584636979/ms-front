import Vue from 'vue'
import store from '@/store'

/**
 * 清除登录信息
 */
export function clearLoginInfo () {
  Vue.cookie.delete('token')
  Vue.cookie.delete('userId')
  Vue.cookie.delete('account')
  store.commit('resetStore')
}

// 实现深度拷贝
export const deepClone = (obj) => {
  var newObj
  // 数组类型的拷贝
  if (obj instanceof Array) {
    newObj = []
    var i = obj.length
    while (i--) {
      newObj[i] = deepClone(obj[i])
    }
    return newObj
  } else if (obj instanceof Object) {
    newObj = {}
    for (var k in obj) {
      newObj[k] = deepClone(obj[k])
    }
    return newObj
  } else {
    return obj
  }
}

// 判断是否json
export function isJSON (str) {
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str)
      if (typeof obj == 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      // console.log('error：' + str + '!!!' + e)
      return false
    }
  }
  // console.log('It is not a string!')
}

/**
 * 数组去重
 * @param arr
 */
export function uniqueArr (arr) {
  var x = new Set(arr)
  return [...x]
}

/**
 * 判断是否为空值
 * @param date 数据
 */
export function isEmpty (date) {
  if (date === undefined || date === null || date === '') {
    return true
  } else if (date instanceof Array && date.length === 0) {
    return true
  } else if (date instanceof Object && Object.keys(date).length === 0) {
    return true
  }
  return false
}
