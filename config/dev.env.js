'use strict'

let baseUrl = ''
if (process.env.npm_config_website == 'nc') {
  baseUrl = '"http://124.71.46.129:880/api"'
} else {
  baseUrl = '"http://' + process.env.npm_config_website + ':880/api"'
}

module.exports = {
  NODE_ENV: '"development"',
  BASE_NAME: '"' + process.env.npm_config_website + '"',
  BASE_URL: baseUrl,
  OPEN_PROXY: false, // 是否开启代理, 重置后需重启vue-cli
}
