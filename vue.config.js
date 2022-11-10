const path = require('path')
const vConsolePlugin = require('vconsole-webpack-plugin')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  lintOnSave: false,
  configureWebpack: config => {
    config.entry.app = ['./src/main.js'],
      config.performance = {
        hints: false
      }
    const debug = process.env.NODE_ENV !== 'production'
    let pluginsDev = [
      new vConsolePlugin({
        filter: [],
        enable: debug
      })
    ]
    config.plugins = [...config.plugins, ...pluginsDev]
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('common', resolve('src/common'))
      .set('img', resolve('src/assets/img'))
      .set('components', resolve('src/components'))
      .set('plugins', resolve('src/plugins'))
      .set('views', resolve('src/views'))
  }
}