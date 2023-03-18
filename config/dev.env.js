'use strict'

let webOps = {
  BASE_NAME: '"' + process.env.npm_config_website + '"',
  BASE_FAVICON: '"static/img/favicon_' + process.env.npm_config_website + '.png"'
}
switch (process.env.npm_config_website) {
  case 'nc':
    webOps.BASE_URL = '"http://124.71.46.129:880/api"'
    webOps.BASE_TITLE = '"墨水激活系统 Ink Activation System"'
    break;
  case 'mt':
    webOps.BASE_URL = '"http://120.78.94.79:880/api"'
    webOps.BASE_TITLE = '"墨水激活系统 Ink Activation System"'
    break;
  default:
    webOps.BASE_URL = '"http://' + process.env.npm_config_website + ':880/api"'
    webOps.BASE_TITLE = '"' + process.env.npm_config_website + '墨水激活系统 Ink Activation System"'
    break;
}

module.exports = {
  NODE_ENV: '"development"',
  OPEN_PROXY: false, // 是否开启代理, 重置后需重启vue-cli
  ...webOps
}
