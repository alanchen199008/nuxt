const path = require('path')
const theme = path.resolve(__dirname, 'src/styles/vant_variables.less')
const cdnDependencies = require('./dependencies-cdn')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const port = process.env.port || process.env.npm_config_port || 8888

process.env.VUE_APP_VERSION = require('./package.json').version

let externals = {}
cdnDependencies.forEach(material => { externals[material.name] = material.library })
// 引入文件的 cdn 链接
const cdn = {
  css: cdnDependencies.map(e => e.css).filter(Boolean),
  js: cdnDependencies.map(e => e.js).filter(Boolean)
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    // name: name,
    resolve: {
      alias: {
        '@': resolve('src'), // 主目录
        views: resolve('src/views'), // 页面
        components: resolve('src/components'), // 组件
        api: resolve('src/api'), // 接口
        utils: resolve('src/utils'), // 通用功能
        assets: resolve('src/assets'), // 静态资源
        style: resolve('src/style') // 通用样式
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', config =>
        config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV === 'production', config => {
        config.plugin('html').tap(args => {
          args[0].cdn = cdn
          return args
        })
        config.externals(externals)

        config
          .plugin('compressionPlugin')
          .use(new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
            threshold: 10240,
            minRatio: 0.8
          }))
        config.optimization.splitChunks({
          chunks: 'all',
          cacheGroups: {
            vendors: {
              name: 'chunk-vendors',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'initial',
              priority: 1,
              reuseExistingChunk: true,
              enforce: true
            },
            commons: {
              name: 'chunk-common',
              chunks: 'initial',
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 2,
              reuseExistingChunk: true,
              enforce: true
            },
            vant: {
              name: 'chunk-vant',
              test: /[\\/]node_modules[\\/]vant[\\/]/,
              chunks: 'all',
              priority: 3,
              reuseExistingChunk: true,
              enforce: true
            },
            echarts: {
              name: 'chunk-echarts',
              test: /[\\/]node_modules[\\/](vue-)?echarts[\\/]/,
              chunks: 'all',
              priority: 4,
              reuseExistingChunk: true,
              enforce: true
            }
          }
        })
      })
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            hack: `true; @import "${theme}";`
          }
        }
      },
      sass: {
        additionalData: `
          @import "@/styles/theme-variables.scss";
          @import "@/styles/_mixin.scss";
        `
      }
    }
  }
}
