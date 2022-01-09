const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']
module.exports = {
  publicPath: '/payment-platform/',
  productionSourceMap: false,
  chainWebpack: config => {
    config.optimization.runtimeChunk('single')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.resolve.alias
      .set('@', resolve('src'))
  },
  configureWebpack: config => {
    config.plugins.push(new CompressionWebpackPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), // 匹配文件名
      threshold: 10240, // 对10K以上的数据进行压缩
      minRatio: 0.8,
      deleteOriginalAssets: process.env.VUE_APP_FLAG === 'production' ? true : false
    }))
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "/src/style/vant-theme.less";`
        }
      }
    }
  }
}
