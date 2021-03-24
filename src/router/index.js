import Vue from 'vue'
import Router from 'vue-router'
let Layout = ()=>import('../pages/Layout')
let Login = ()=>import('../pages/Login')
let Menu = ()=>import('../pages/menu/Index')
let User = ()=>import('../pages/user/Index')
let Role = ()=>import('../pages/role/Index')
let Cate = ()=>import('../pages/cate/Index')
let Specs = ()=>import('../pages/specs/Index')
let Home = ()=>import('../pages/home/Index')
let Goods = ()=>import('../pages/goods/Index')


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      meta: {
        title: '布局页面'
      },
      redirect:"/home",
      children: [
        {
          path: '/menu',
          name: 'Menu',
          component: Menu,
          meta: {
            title: '菜单管理'
          }
        },
        {
          path: '/user',
          name: 'User',
          component: User,
          meta: {
            title: '管理员管理'
          }
        },
        {
          path: '/role',
          name: 'Role',
          component: Role,
          meta: {
            title: '角色管理'
          }
        },
        {
          path: '/cate',
          name: 'Cate',
          component: Cate,
          meta: {
            title: '商品分类'
          }
        },
        {
          path: '/specs',
          name: 'Specs',
          component: Specs,
          meta: {
            title: '商品规格'
          }
        },
        {
          path: '/home',
          name: 'Home',
          component: Home,
          meta: {
            title: '商品规格'
          }
        },
        {
          path: '/goods',
          name: 'Goods',
          component: Goods,
          meta: {
            title: '商品规格'
          }
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录页'
      },
      
    }
    
  ]
})
//全局前置守卫
router.beforeEach((to, from, next) => {
  if(to.path != '/login'){
    let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    //
    // userInfo.menus_url.filter(function(value,index){

    // })
    if(!userInfo.token){
      return next('/login')
    }
    
  }
  
  next()
  document.title = to.meta.title
})
export default router