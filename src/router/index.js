import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/home/index.vue";
import {Token} from "../utils/token"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/category",
    name: "Category",
    component: () => import('../pages/category/index')
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import('../pages/cart/index')
  },
  {
    path: "/search",
    name: "Search",
    component: () => import('../pages/search/index')
  },
  {
    path: "/search-list",
    name: "SearchList",
    component: () => import('../pages/search-list/index')
  },
  {
    path: "/goods-list",
    name: "GoodsList",
    props:route => {
      let cid = route.query.cid || 0
      const cname = route.query.cname || ''
      if(isNaN(cid)){
        cid = 0
      }
      return {
        cid : parseInt(cid),
        cname
      }
    },
    component: () => import('../pages/goods-list/index')
  },
  {
    path:"goods-error",
    name:"GoodsError",
    component:() => import('../pages/goods-notfound/index')
  },
  {
    path:"/login",
    name:"Loginin",
    component:() => import('../pages/login/index')
  },
  {
    path:"/register",
    name:"Register",
    component:() => import('../pages/register/index')
  },
  {
    path:"/goods-detail",
    redirect:"/"
  },
  {
    path:"/coupon",
    name:"Coupon",
    component:() => import('../pages/coupon/index')
  },
  {
    path:'/user',
    name:'User',
    component:() => import('../pages/user/index')
  },
  {
    path:'/user/info',
    name:'UserInfo',
    component:() => import('../pages/user-info/index')
  },
  {
    path:'/user/address',
    name:'UserAddress',
    component:() => import('../pages/user-address/index')
  },
  {
    path:'/user-order',
    name:'UserOrder',
    component:() => import('../pages/user-order/index')
  },
  {
    path:'/user-notice',
    name:'UserNotice',
    component:() => import('../pages/user-notice/index')
  },
  {
    path:'/user-coupon',
    name:'UserCoupon',
    component:() => import('../pages/user-coupon/index')
  },
  {
    path:'/order/address',
    name:'OrderAddress',
    component:() => import('../pages/order-address/index')
  },
  {
    path:'/order-detail',
    name:'OrderDetail',
    component:() => import('../pages/order-detail/index')
  },
  {
    path:'/order/pay',
    beforeEnter(to, from, next) {
      const id = to.query.id
      if(!/^\d+$/.test(id)){
        console.log(to.params.id)
        next('/')
      }else{
        next()
      }
    },
    name:'OrderPay',
    component:() => import('../pages/order-pay/index')
  },
  {
    path:'/user/add-address',
    name:'AddAddress',
    component:() => import('../pages/add-address/index')
  },
  {
    path:"/order",
    name:"Order",
    component:() => import('../pages/order/index')
  },
	{
    path:"/user-sign",
    name:"UserSign",
    component:() => import('../pages/user-sign/index')
  },
  {
    path:"/user-footprient",
    name:"UserFootprient",
    component:() => import('../pages/user-footprient/index')
  },
  {
    path:"/user-collection",
    name:"UserCollection",
    component:() => import('../pages/user-collection/index')
  },
  {
    path:"/user-points",
    name:"UserPoints",
    component:() => import('../pages/user-points/index')
  },
  {
    path: "/goods-detail/:id",
    beforeEnter(to, from, next) {
      const id = to.params.id
      if(!/^\d+$/.test(id)){
        next(from.path)
      }else{
        next()
      }
    },
    props:route => {
      return {
        id:parseInt(route.params.id)
      }
    },
    name: "GoodsDetail",
    component:() => import('../pages/goods-detail/index')
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass:"active",
  scrollBehavior(){
    return {x:0,y:0}
  }
});
//需要做验证的路由名称
const AUTH_ROUTER_NAME = [
  'Coupon',
  'Order',
  'User',
  'UserAddress',
  'AddAddress',
  'OrderAddress',
  'AddAddress',
  'UserInfo',
  'UserOrder',
  'UserFootprient',
  'OrderDetail',
  'UserNotice',
  'UserPoints'
]
//登陆验证
router.beforeEach((to,from,next) => {
  if(AUTH_ROUTER_NAME.includes(to.name)){
    const token = Token.getToken()
    if(token === ''){
      // console.log(to,from)
      let url;
      // if(to.query.loginRedirect !== ''){
      if(to.query.loginRedirect){
        url = decodeURIComponent(to.query.loginRedirect)
      }else{
        // url = encodeURIComponent(from.path)
        url = encodeURIComponent(to.path)
      }
      next(`/login?url=${url}`)
    }else{
      next()
    }
  }else{
    next()
  }
})

export default router;
