'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
      env: require('./dev.env'),
      port: 8080,
      autoOpenBrowser: true,
      assetsSubDirectory: 'static',
      assetsPublicPath: '/',
      proxyTable: {
          '/api': {
              target: 'http://localhost:4280/',
              changeOrigin: true,
              pathRewrite: {
                  '^/api': '/api'
              }
          }
      },
      cssSourceMap: false
  },

  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: 'https://admin.gaoqiuzi.cn/',
    productionSourceMap: true,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
