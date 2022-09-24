// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import Manage from '../pages/Manage.vue'
import User from '../pages/User.vue'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import UserInfo from '../pages/UserInfo.vue'
import store from '@/store'

//创建并暴露一个路由器
let router = new VueRouter({
  mode: 'history',//注意要换成 history 模式
  routes: [
    {
      path: '/',
      name: 'Manage',
      redirect: '/home',
      component: Manage,
      children: [
        {
          name: 'User',
          path: 'user',
          meta: {
            title: '用户管理'
          },
          component: User
        },
        {
          name: 'UserInfo',
          path: 'user/info',
          meta: {
            title: '用户信息'
          },
          component: UserInfo
        },
        {
          name: 'Home',
          path: 'home',
          meta: {
            title: '首页'
          },
          component: Home
        }
      ]
    },
    {
      path: '/user/login',
      name: 'Login',
      meta: {
        title: '管理员登录'
      },
      component: Login
    },
    {
      path: '/user/register',
      name: 'Register',
      meta: {
        title: '用户注册'
      },
      component: Register
    }
  ],
})

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  // localStorage.setItem("currentPathName", to.name) //设置当前去往的路由名称，方便 Heder 组件的更新
  store.commit("setPath", to.name) // 触发 vuex 中的 state 中的 数据更新
  next()
})

router.afterEach((to, from) => {
  // console.log('后置路由守卫',to,from)
  document.title = '华杰管理系统--' + to.meta.title || '华杰管理系统'
})

export default router