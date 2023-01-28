// 自动化，无需配置，自动查询pages里面的vue文件生成路由
// 如 testDemo.vue  路由为 test_demo
import Vue from 'vue'
import VueRouter from 'vue-router'
import index from './pages/index'

Vue.use(VueRouter)

//  全局导入组件
const LOCAL_PAGES = [];

const requireComponent = require.context(
  //  其组件目录的相对路径
  '@/pages/',
  //  是否查询其子目录
  true,
  //  匹配基础组件文件名的正则表达式, 这里可以匹配的文件名为TdXxxx.vue格式
  /.(vue)$/
);

requireComponent.keys().forEach(fileName => {
  //  获取组件的路径
  //  剥去文件名开头的 `'./` 和结尾的扩展名
  LOCAL_PAGES.push(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'));
});

//  驼峰转下划线
function humpToLine(name) {
  let _name = name.replace(name[0], name[0].toLowerCase());
  return _name.replace(/([A-Z])/g, '_$1').toLowerCase();
}

// 设置动态标题
const title = {
  'index': '首页',
  'login': '登录',
  'demo': '演示'
}
let routerS = function() {
  let routes = [
    {
      path: '/',
      component: index
    }
  ]
  LOCAL_PAGES.map(page => {
    let lineFileName = humpToLine(page);
    let _path = `/${lineFileName}`;
    routes.push({
      path: _path,
      name: page,
      component: resolve => require([`@/pages/${page}.vue`], resolve),
      meta: {
        currentMenu: page,
        title: title[page]
      }
    });
  });
  return routes
}
let routes = routerS()
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // 统计代码
  window._hmt.push(['_trackPageview', to.fullPath]);
  next();
});
export default router
