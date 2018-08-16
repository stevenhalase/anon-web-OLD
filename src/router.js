import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/board/:abbr',
      name: 'BoardPage',
      props: true,
      component: () => import(/* webpackChunkName: "BoardPage" */ './views/BoardPage.vue')
    },
    {
      path: '/board/:abbr/thread/:threadNo',
      name: 'ThreadPage',
      props: true,
      component: () => import(/* webpackChunkName: "ThreadPage" */ './views/ThreadPage.vue')
    }
  ]
})
