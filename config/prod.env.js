'use strict'

let webOps = {
  BASE_NAME: '"' + process.env.npm_config_website + '"',
  BASE_FAVICON: '"static/img/favicon_' + process.env.npm_config_website + '.png"'
}
if (process.env.npm_config_website == 'nc') {
  webOps.BASE_URL = '"http://124.71.46.129:880/api"'
  webOps.BASE_TITLE = '"墨水激活系统 Ink Activation System"'
} else {
  webOps.BASE_URL = '"http://' + process.env.npm_config_website + ':880/api"'
  webOps.BASE_TITLE = '"' + process.env.npm_config_website + '墨水激活系统 Ink Activation System"'
}

module.exports = {
  NODE_ENV: '"production"',
  OPEN_PROXY: false,
  ...webOps
}
