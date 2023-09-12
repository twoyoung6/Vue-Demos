const path = require('path')
const vConsolePlugin = require('vconsole-webpack-plugin')
const resolve = dir => path.join(__dirname, dir)

const SpritesmithPlugin = require('webpack-spritesmith');
const templateFunction = function (data) {
  const shared = '.ico { background: url(I)  no-repeat; background-size: Wpx Hpx;}'
    .replace('I', data.sprites[0].image)
    .replace('W', data.sprites[0].total_width)
    .replace('H', data.sprites[0].total_height)
  const perSprite = data.sprites.map(function (sprite) {
    return '.ico-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
      .replace('N', sprite.name)
      .replace('W', sprite.width)
      .replace('H', sprite.height)
      .replace('X', sprite.offset_x)
      .replace('Y', sprite.offset_y);
  }).join('\n');

  return shared + '\n' + perSprite;
}

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
    // 合成精灵图配置
    config.resolve.modules = ["node_modules", "sprite"]
    let spritePlugins = [
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, 'src/assets/icons'),
          glob: '*.png'
        },
        target: {
          image: path.resolve(__dirname, 'src/sprite/sprite.png'),
          css: [
            [path.resolve(__dirname, 'src/sprite/sprite.scss'), {
              format: 'handlebars_based_template'
            }]
          ]
        },
        customTemplates: {
          'handlebars_based_template': templateFunction,
        },
        apiOptions: {
          cssImageRef: "~sprite.png"
        }
      })
    ]
    config.plugins = [...config.plugins, ...pluginsDev, ...spritePlugins]
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