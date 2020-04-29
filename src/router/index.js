import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/home/index.vue";
import Category from "../pages/category/index";
import GoodsList from "../pages/goods-list/index";

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
    path: "/goods-list/:cid",
    name: "GoodsList",
    props:route => {
      console.log(route)
      return{
        cid:100
      }
    }
    component: GoodsList
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
