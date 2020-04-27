<template>
    <div class="page">
        <common-header></common-header>
        <search-bar></search-bar>
        <home-swiper :swiperList="swiperList"></home-swiper>
        <icon-nav :navList="navList"></icon-nav>
        <recommend :recommendList="recommendList"></recommend>
        <sales :salesList="salesList"></sales>
        <new-goods :newGoodsList="newGoodsList"></new-goods>
        <goods-list :goodsList="recommendList"></goods-list>
    </div>
</template>

<script>
import CommonHeader from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import HomeSwiper from './Swiper'
import IconNav from './IconNav'
import Recommend from './Recommend'
import Sales from './Sales'
import NewGoods from './NewGoods'
import GoodsList from './GoodsList'
export default {
    components:{
        CommonHeader,
        SearchBar,
        HomeSwiper,
        IconNav,
        Recommend,
        Sales,
        NewGoods,
        GoodsList
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
        }
    },
    mounted() {
        this.getSwiper();
        this.getIconNav();
        this.getRecommend();
        this.getSales();
        this.getNewGoods();
        this.getGoodsList();
    },
    methods: {
        async getSwiper () {
            const res = await this.axios.get('/api/swiper?type=1')
            this.swiperList = res.map(item => item.img)
        },
        async getIconNav(){
            this.navList = await this.axios.get('/api/navigate?type=1');
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
            console.log(goods,total,this.goodsList)
            this.goodsList = this.goodsList.concat(goods)
            if(this.page === 1){
                this.totalPage = Math.ceil(total / this.count)
            }
        },
    },
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width:100%;
    min-height:100%;
    background-color:$color-c;
}
</style>