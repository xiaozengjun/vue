const path = require('path')
const glob = require('glob')
require('babel-polyfill')

// const titles = {
//   home: '这是home标题',
//   index: '这是index标题'
// }
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// 获取views文件夹下的文件
function getEntry (globPath) {
  const entries = {}
  // 读取js文件
  glob.sync(globPath + 'js').forEach(function (entry) {
    const tmp = entry.split('/').splice(-3)
    entries[tmp[1]] = {
      entry,
      template: './public/index.html',
      filename: tmp[1] + '.html'
      // title: titles[tmp[1]]
    }
  })
  return entries
}


const htmls = getEntry('./src/views/**/*.')
// console.log(htmls);
module.exports = {
  pages: htmls,
  publicPath: process.env.NODE_ENV=='development'?'./':'/dist/pc',
  outputDir: '../../web/dist/pc', // 打包后的文件夹名称，默认dist
  css:{

  },
  configureWebpack: config => {
    const { entry } = config
    for (const i in entry) {
      entry[i].unshift('babel-polyfill')
    }
  },
  devServer: {
    open: true,
    hot: true,
    index: './index.html', // 默认启动页面
    host: '0.0.0.0',
    port: port,
    proxy:{
      '/api': {
        target:'http://project_libraries.report',
        changeOrigin:true,
        pathRewrite: {
          '^/api': '/'
        },
      }
    }
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  transpileDependencies: [],
}
