/**
 * 生产环境
 */
;(function () {
  window.SITE_CONFIG = {}

  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['siteName'] = 'mt' // 编译平台
  window.SITE_CONFIG['domain'] = './' // 域名
  window.SITE_CONFIG['version'] = '2305291306'   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl'] = window.SITE_CONFIG.domain + window.SITE_CONFIG.version + '_' + window.SITE_CONFIG['siteName']
})()

/**
 * 动态加载初始资源
 */
;(function () {
  var resList = {
    icon: window.SITE_CONFIG.cdnUrl + '/static/img/favicon_' + window.SITE_CONFIG.siteName + '.png',
    css: [
      window.SITE_CONFIG.cdnUrl + '/static/css/loading.css',
      window.SITE_CONFIG.cdnUrl + '/static/css/app.css'
    ],
    js: [
      // 插件, 放置业务之前加载, 以免业务需求依赖插件时, 还未加载出错
      // 插件 - 视频点播
      // 业务
      window.SITE_CONFIG.cdnUrl + '/static/js/manifest.js',
      window.SITE_CONFIG.cdnUrl + '/static/js/vendor.js',
      window.SITE_CONFIG.cdnUrl + '/static/js/app.js'
    ]
  };

  // 图标
  (function () {
    var _icon = document.createElement('link')
    _icon.setAttribute('rel', 'shortcut icon')
    _icon.setAttribute('type', 'image/x-icon')
    _icon.setAttribute('href', resList.icon)
    document.getElementsByTagName('head')[0].appendChild(_icon)
  })();

  // 样式
  (function () {
    document.getElementsByTagName('html')[0].style.opacity = 0
    var i = 0
    var _style = null
    var createStyles = function () {
      if (i >= resList.css.length) {
        document.getElementsByTagName('html')[0].style.opacity = 1
        return
      }
      _style = document.createElement('link')
      _style.href = resList.css[i]
      if (resList.css[i].indexOf('loading') !== -1) {
        _style.id = 'loadCss'
      }
      _style.setAttribute('rel', 'stylesheet')
      _style.onload = function () {
        i++
        createStyles()
      }
      document.getElementsByTagName('head')[0].appendChild(_style)
    }
    createStyles()
  })()

  // 脚本
  document.onreadystatechange = function () {
    if (document.readyState === 'interactive') {
      var i = 0
      var _script = null
      var createScripts = function () {
        if (i >= resList.js.length) {
          return
        }
        _script = document.createElement('script')
        _script.src = resList.js[i]
        _script.onload = function () {
          i++
          createScripts()
        }
        document.getElementsByTagName('body')[0].appendChild(_script)
      }
      createScripts()
    }
  }
})()
