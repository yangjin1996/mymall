<template>
    <div class="page" ref="page">
        <common-header></common-header>
        <search-bar></search-bar>
        <!-- <div class="wrapper-container" ref="container"> -->
        <div class="wrapper">
            <home-swiper :swiperList="swiperList"></home-swiper>
            <icon-nav :navList="navList"></icon-nav>
            <recommend :recommendList="recommendList"></recommend>
            <sales :salesList="salesList"></sales>
            <new-goods :newGoodsList="newGoodsList"></new-goods>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="scrollDistance">
                <goods-list :goodsList="goodsList"></goods-list>
            </div>
        </div>
        <!-- </div>     -->
        <common-footer></common-footer>
    </div>
</template>

<script>
// import BScroll from 'better-scroll'
import infiniteScroll from 'vue-infinite-scroll'
import CommonHeader from '@/components/Header'
import CommonFooter from '@/components/Footer'
import SearchBar from '@/components/SearchBar'
import HomeSwiper from './Swiper'
import IconNav from './IconNav'
import Recommend from './Recommend'
import Sales from './Sales'
import NewGoods from './NewGoods'
import GoodsList from './GoodsList'
import { Storage } from '@/utils/storage'
export default {
    directives: {infiniteScroll},
    components:{
        CommonHeader,
        SearchBar,
        HomeSwiper,
        IconNav,
        Recommend,
        Sales,
        NewGoods,
        GoodsList,
        CommonFooter,
        scroll:null
    },
    data(){
        return{
            swiperList:[],
            navList:[],
            recommendList:[],
            salesList:[],
            newGoodsList:[],
            goodsList:[],
            page:1,//为你推荐的页码
            count:8, //为你推荐每次获取的数量
            totalPage:0,//为你推荐的总页数
            busy:false,
            scrollDistance:0
        }
    },
    async mounted() {
        const footerHeight = document.querySelector(".footer-container").offsetHeight
        this.$refs.page.style.paddingBottom = footerHeight + 'px'
        this.scrollDistance = footerHeight
        this.$showLoading();
        await this.getSwiper();
        await this.getIconNav();
        await this.getRecommend();
        await this.getSales();
        await this.getNewGoods();
        // this.getBscrollBoxHeight();
        // this.initScroll();
        // await new BScroll('.wrapper', {
        //     scrollY: true,
        //     scrollX: false,
        //     snap: {  // 滑动切换的一些配置
        //         speed: 800,  // 滑动切换的速度
        //         easing: {  // 滑动切换的动画效果
        //         style: 'ease-in'
        //         },
        //         threshold: 0.5,  // 滑动切换到超过一半时切换到下一屏
        //         stepX: 600,  // 横向切换距离为轮播图宽度
        //     }
        // });
        this.$hideLoading()
    },
    methods: {
        initScroll(){
            this.scroll = new this.$BScroll('.wrapper-container',{
                scrollY: true,
                click: true,
                probeType: 3,
                pullDownRefresh:{
                threshold: -10, // 在上拉到超过底部 20px 时，触发 pullingUp 事件
                stop: 0
                },
                pullUpLoad: {
                threshold: 50, 
                },
            });
        },
        getBscrollBoxHeight(){
            let bodyHeight = window.innerHeight;
            const html = document.querySelector('html');
            let WindowHeight = bodyHeight / parseFloat(html.style.fontSize);
            let BscBoxHeight = WindowHeight - 3.08 + 'rem';
            this.$refs.container.style.height = BscBoxHeight;
            console.log(bodyHeight,WindowHeight,BscBoxHeight)
        },
        async getSwiper () {
            const swiper = Storage.getItem('swiper')
            if(swiper){
                this.swiperList = swiper
            }else{
                const res = await this.axios.get('/api/swiper?type=1')
                const swiperList = res.map(item => item.img)
                this.swiperList = swiperList
                Storage.setItem('swiper',swiperList)
            }
        },
        async getIconNav(){
            const navList = Storage.getItem('navList')
            if(navList){
                this.navList = navList
            }else{
                const navList = await this.axios.get('/api/navigate?type=1');
                this.navList = navList
                Storage.setItem('navList',navList)
            }
        },
        async getRecommend(){
            this.recommendList = await this.axios.get('/api/goods/recommend?type=1');
        },
        async getSales(){
            this.salesList = await this.axios.get('/api/goods/sales?type=1');
        },
        async getNewGoods(){
            this.newGoodsList = await this.axios.get('/api/goods/new?type=1');
        },
        async getGoodsList(){
            const {goods,total} = await this.axios.get('/api/goods_list?type=1',{
                params:{
                    page:this.page,
                    count:this.count
                }
            });
            this.goodsList = this.goodsList.concat(goods)
            if(this.page === 1){
                this.totalPage = Math.ceil(total / this.count)
            }
            this.page++
        },
        async loadMore(){
            this.busy = true
            if(this.page <= this.totalPage || this.totalPage === 0){
                await this.getGoodsList()
                this.busy = false
            }
        }
    },
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width:100%;
    min-height:100%;
    // padding-top:1.78rem;
    background-color:$color-c;
    box-sizing: border-box;
    // .wrapper-container{
    //     width:100%;
    //     overflow: hidden;
    // }
    .swiper-container-ios{
        margin-top:$page-margin-top;
    }
}
</style>