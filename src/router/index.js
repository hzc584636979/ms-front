/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/404',
    component: _import('modules/common/404'),
    name: '404',
    meta: { title: '404未找到' }
  },
  {
    path: '/home',
    component: _import('modules/home'),
    name: 'home',
    meta: { title: '首页' }
  },
  {
    path: '/login',
    component: _import('modules/login'),
    name: 'login',
    meta: { title: '登录' }
  },
  {
    path: '/register',
    component: _import('modules/register'),
    name: 'register',
    meta: { title: '注册' }
  },
  {
    path: '/forget',
    component: _import('modules/forget'),
    name: 'forget',
    meta: { title: '找回密码' }
  }
]

// 配置公共路由
const router = new Router({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
