import router from './Router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // 无重定向白名单,不登录允许访问

router.beforeEach(async(to, from, next) => {
  // 开始进度条
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 确定用户是否已登录
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.editmenu
      if (hasGetUserInfo) { // 判断是否有左侧导航, 如果有就直接跳转到指定路由
        next()
      } else {// 否则是第一次登录或刷新页面(-> 获取个人信息 -> 获取左侧导航 -> 整理左侧导航数据)
        try {
          // 获取用户信息 (如果登录的时候请求了接口, 数据会保存在vuex直接获取)
          await store.dispatch('user/getInfo').then((data_s) => {
            console.log(data_s)
            next()
          })
        } catch (error) {
          // 移除令牌并转到登录页面重新登录
          await store.dispatch('user/resetToken')
          // Message({ type: 'error', message:  error || 'Has Error'})
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 直接去白名单页面
      next()
    } else {
      // 其他无权访问的页面将被重定向到登录页面。
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
