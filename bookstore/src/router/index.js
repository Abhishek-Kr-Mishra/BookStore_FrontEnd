import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import Books from '../components/Books'
import Carts from '../components/Carts'
import OrderSuccess from '../components/OrderSuccess.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path:'/login',
    name:'Login',
    component: Login,
    meta:{
      guest: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
  },
    children: [
      {
        path: 'books',
        name: 'Books',
        component: Books,
        meta: {
          requiresAuth: true
      }
      },
      {
        path: 'cart',
        name: 'Carts',
        component: Carts
      },
      {
        path: 'orderSuccess',
        name: 'OrderSuccess',
        component: OrderSuccess
      }

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.replace({ path: 'dashboard/orderSuccess', redirect: '/' })

router.beforeEach((to, from, next)=> {

    if(to.matched.some(record => record.meta.requiressAuth)){
      if (localStorage.getItem('accessToken') == null) {
        next({
            path: '/login',
        })
      }
      else{
        next({ path: '/dashboard/books'})
      }
    }
    else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('accessToken') == null){
          next()
      }
      else{
          next({ path: '/dashboard'})
      }
    }
    else{
      next()
    }
})

export default router
