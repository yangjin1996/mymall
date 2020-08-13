import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/home/index.vue";
import Category from "../pages/category/index";
import GoodsList from "../pages/goods-list/index"
import GoodsDetail from "../pages/goods-detail/index";
import GoodsError from "../pages/goods-notfound/index";
import Cart from "../pages/cart/index";
import Login from "../pages/login/index";
import Register from "../pages/register/index";
import Coupon from "../pages/coupon/index";
import Order from "../pages/order/index";
import AddAddress from "../pages/add-address/index";
import User from "../pages/user/index";
import UserInfo from "../pages/user-info/index";
import OrderAddress from "../pages/order-address/index";
import OrderPay from "../pages/order-pay/index";
import UserAddress from "../pages/user-address/index";
import UserSign from "../pages/user-sign/index";
import UserFootprient from "../pages/user-footprient/index";
import UserCollection from "../pages/user-collection/index";
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
    component: Category
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart
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
    component: GoodsList
  },
  {
    path:"goods-error",
    name:"GoodsError",
    component:GoodsError
  },
  {
    path:"/login",
    name:"Loginin",
    component:Login
  },
  {
    path:"/register",
    name:"Register",
    component:Register
  },
  {
    path:"/goods-detail",
    redirect:"/"
  },
  {
    path:"/coupon",
    name:"Coupon",
    component:Coupon
  },
  {
    path:'/user',
    name:'User',
    component:User
  },
  {
    path:'/user/info',
    name:'UserInfo',
    component:UserInfo
  },
  {
    path:'/user/address',
    name:'UserAddress',
    component:UserAddress
  },
  {
    path:'/order/address',
    name:'OrderAddress',
    component:OrderAddress
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
    component:OrderPay
  },
  {
    path:'/user/add-address',
    name:'AddAddress',
    component:AddAddress
  },
  {
    path:"/order",
    name:"Order",
    component:Order
  },
	{
    path:"/user-sign",
    name:"UserSign",
    component:UserSign
  },
  {
    path:"/user-footprient",
    name:"UserFootprient",
    component:UserFootprient
  },
  {
    path:"/user-collection",
    name:"UserCollection",
    component:UserCollection
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
    component:GoodsDetail
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
const AUTH_ROUTER_NAME = ['Coupon','Order','User','UserAddress','AddAddress','OrderAddress','AddAddress','UserInfo']
//登陆验证
router.beforeEach((to,from,next) => {
  if(AUTH_ROUTER_NAME.includes(to.name)){
    const token = Token.getToken()
    if(token === ''){
      let url;
      if(to.query.loginRedirect !== ''){
        url = decodeURIComponent(to.query.loginRedirect)
      }else{
        url = encodeURIComponent(from.path)
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
