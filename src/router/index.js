import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home/index.vue'
const goodsshow=()=>import('@/components/private/goodsshow.vue')
const register=()=>import('@/views/personal/children/register.vue')
const login=()=>import('@/views/personal/children/Login.vue')
const address=()=>import('@/views/personal/children/address.vue')
const order=()=>import('@/views/personal/children/order.vue')
const ordershow=()=>import('@/views/personal/children/ordershow.vue')
const userxq=()=>import('@/views/personal/children/userxq.vue')
const phone=()=>import('@/views/personal/children/phone.vue')
const email=()=>import('@/views/personal/children/email.vue')
const setpassword=()=>import('@/views/personal/children/setpassword.vue')
const Mycollects=()=>import('@/views/personal/children/Mycollects.vue')
const uploader=()=>import('@/views/personal/children/uploader.vue')
const setaddress=()=>import('@/views/personal/children/setaddress.vue')
const OrderDetails=()=>import('@/views/personal/children/OrderDetails.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/sort',
    name: 'sort',
    component: () => import( '../views/sort/index.vue')
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import( '../views/personal/index.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/ShoppingCart',
    name: 'ShoppingCart',
    component: () => import( '../views/ShoppingCart/index.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/goodsshow/:good',
    name:'goodsshow',
    component: goodsshow
  },
  {
    path: '/address',
    name:'address',
    component: address,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/userxq',
    name:'userxq',
    component: userxq,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/phone',
    name:'phone',
    component: phone,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/email',
    name:'email',
    component: email,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/setpassword',
    name:'setpassword',
    component: setpassword,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/Mycollects',
    name:'Mycollects',
    component: Mycollects,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/uploader',
    name:'uploader',
    component: uploader,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/order',
    name:'order',
    component: order,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/ordershow',
    name:'ordershow',
    component: ordershow,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/OrderDetails',
    name:'OrderDetails',
    component: OrderDetails,
    meta:{
      requiresAuth:true
    }
  },

  {
    path: '/setaddress',
    name:'setaddress',
    component: setaddress
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next)=>{
  console.log(to.meta.requiresAuth)
  if(to.meta.requiresAuth && !window.localStorage.getItem('token')){
    next({name:'login'})
  }else {
    next()
  }
})

export default router
