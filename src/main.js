import Vue from 'vue'
import App from '@/App'
import router from '@/router'                 // api: https://github.com/vuejs/vue-router
import store from '@/store'                   // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie'            // api: https://github.com/alfhen/vue-cookie
import VueClipBoard from 'vue-clipboard2'
import '@/element-ui'
import '@/element-ui-theme'
import '@/assets/scss/index.scss'
import 'default-passive-events'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import i18n from '@/lang'
import { uniqueArr, isEmpty } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'
Vue.use(VueCookie)
Vue.use(VueClipBoard)
Vue.config.productionTip = false

// 兼容IE11
if (!FileReader.prototype.readAsBinaryString) {
  FileReader.prototype.readAsBinaryString = function (fileData) {
    var binary = ''
    var pt = this
    var reader = new FileReader()
    reader.onload = function (e) {
      var bytes = new Uint8Array(reader.result)
      var length = bytes.byteLength
      for (var i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      // pt.result  - readonly so assign binary
      pt.content = binary
      pt.onload()
    }
    reader.readAsArrayBuffer(fileData)
  }
}
// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.uniqueArr = uniqueArr     // 数组去重
Vue.prototype.$isEmpty = isEmpty // 判断是否为空值

// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: { App }
})
