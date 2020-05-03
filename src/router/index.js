
import Vue from "vue"
import Router from 'vue-router'

//import HelloWorld from '@/components/HelloWorld'
//import Apple from '@/components/Apple'
//import Banana from '@/components/Banana'

import  IndexPage from '../pages/index.vue'

import DetailPage from '../pages/detail'
import OrderListPage from '../pages/orderList'
import VueResource from 'vue-resource'
import DetailAnaPage from '../pages/detail/analysis'
import DetailCouPage from '../pages/detail/count'
import DetailForPage from '../pages/detail/forecast'
import DetailPubPage from '../pages/detail/publish'
import axios from 'axios' 
import qs from 'qs'
import VueJsonp from 'vue-jsonp'
Vue.use(Router)
Vue.use(VueResource)
Vue.use(VueJsonp)
Vue.prototype.$ajax=axios  
Vue.prototype.$qs=qs

Vue.use(Router)

export default new Router({
  //mode:'history',
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    }
    ,
  {
    path:'/orderList',
    component:OrderListPage
  },
  {
    path:'/detail',
    component:DetailPage,
    redirect:'/detail/count',
    children:[
      {
        path:'analysis',
        component:DetailAnaPage
      },
      {
        path:'count',
        component:DetailCouPage
      },
      {
        path:'forecast',
        component:DetailForPage
      },
      {
        path:'publish',
        component:DetailPubPage
      }
    ]
  }
  ]
})
