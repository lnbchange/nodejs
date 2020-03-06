import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:'/home',
    name:'home',
    component:()=>import('../views/home/Home.vue')
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/Login.vue')
  },
  {
    path:'/registry',
    name:'registry',
    component:()=>import('../views/Registry.vue')
  },
  {
    path:'/publish',
    name:'publish',
    component:()=>import('../views/home/Publish.vue')
  },
  {
    path:'/detail',
    name:'detail',
    component:()=>import('../views/Detail.vue')
  },
  {
    path:'/myvote',
    name:'myvote',
    component:()=>import('../views/Myvote.vue')
  },
  {
    path:'/',
    redirect:'/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{//全局守卫
  let writeArr=['/login','/registry'];
  if(writeArr.includes(to.path)){
      next()
  }else{
      if(localStorage.token){
        next()
      }else{
        next('/login')
      }
  }
})

export default router
