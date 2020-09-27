const path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  lintOnSave: false,
  configureWebpack: config => {
    config.entry.app = ['./src/main.js'],
      config.performance = {
        hints: false
      }
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