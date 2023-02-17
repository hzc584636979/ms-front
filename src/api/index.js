import Vue from 'vue'
import axios from 'axios'
import http from '../utils/httpRequest'

// POST 请求
function httpPost (url, params, flag = false) {
  return http({
    method: 'post',
    url: http.adornUrl(url),
    data: http.adornData(params, flag)
  })
}

// POST 请求
function httpPostFile (url, params) {
  return http({
    method: 'post',
    url: http.adornUrl(url),
    data: params
  })
}

// PUT 请求
function httpPut (url, params, flag = true) {
  return http({
    method: 'put',
    url: http.adornUrl(url),
    data: http.adornData(params, flag)
  })
}

// DELETE 请求
function httpDelete (url, params, flag = true) {
  return http({
    method: 'delete',
    url: http.adornUrl(url),
    data: http.adornData(params, flag)
  })
}

// GET 请求
function httpGet (url, data = {}, flag = true) {
  if (data.utcParam) { // utcParam 为数组
    const router = data.utcParam.join('/')
    url = `${url}/${router}`
    delete data.utcParam
  }

  return http({
    method: 'get',
    url: http.adornUrl(url),
    params: data ? http.adornParams(data, flag) : http.adornParams()
  })
}

// GET/POST 文件请求
async function httpDownFile (url, {fileName, method, data}) {
  try {
    const res = await axios({
      method: method || 'get',
      headers: {
        'token': Vue.cookie.get('token')
      },
      url: http.adornUrl(url),
      params: method === 'get' ? http.adornParams(data, true) : http.adornParams(),
      data: method === 'get' ? {} : data,
      timeout: 1000 * 30,
      responseType: 'blob'
    })
    Vue.prototype.$message({
      message: '生成文件中...',
      type: 'success'
    })
    let fileReader = new FileReader()
    fileReader.onload = function () {
      try {
        let jsonData = JSON.parse(this.result) // 说明是普通对象数据，后台转换失败
        Vue.prototype.$message.error(jsonData.message)
      } catch (err) { // 解析成对象失败，说明是正常的文件流
        let headerFileName = res.headers['content-disposition'] ? decodeURI(res.headers['content-disposition'].split(';')[1].split('filename=')[1]) : fileName
        downLoadBlobFile(res.data, headerFileName, res.headers['content-type'].split(';')[0])
      }
    }
    fileReader.onerror = function (event) {
      Vue.prototype.$message.error('文件读取失败：' + fileReader.error)
      fileReader.abort()
    }
    fileReader.readAsText(res.data)
  } catch (error) {
    Vue.prototype.$message.error(error)
  }
}

export const downLoadBlobFile = (data, fileName, type) => { // type为Mime类型
  let name = fileName || new Date().toLocaleDateString()
  let typeStr = type || 'application/vnd.ms-excel'

  if (window.navigator.msSaveOrOpenBlob) {  // 兼容性处理
    const blob = new Blob([data], { type: typeStr })
    navigator.msSaveBlob(blob, name)
  } else {
    const excelBlob = new Blob([data], { type: typeStr })
    let oa = document.createElement('a')

    oa.href = URL.createObjectURL(excelBlob)
    oa.download = name
    document.body.appendChild(oa)
    oa.click()
  }
}

export {
  httpPost,
  httpPostFile,
  httpGet,
  httpPut,
  httpDelete,
  httpDownFile
}
