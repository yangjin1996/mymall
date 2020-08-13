<template>
<container title="特惠清仓" morePath="/goodsList">
    <template v-slot:content v-if="show">
        <swiper :options="swiperOptions" class="swiper-container" v-if="show">
            <swiper-slide v-for="(item,index) of pages" :key="index" class="swiper-page">
                <router-link tag="div" class="swiper-goods border" v-for="val of item" :key="val.id" :to="`/goods-detail/${val.id}`">
                    <img v-lazy="val.img" class="goods-img">
                    <div class="goods-info">
                        <div class="val-name">{{val.name}}</div>
                        <div class="val-price">￥{{val.price|formatPrice}}</div>
                        <cart-btn font-size=".34rem" :goods="val"></cart-btn>
                    </div>
                </router-link>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </template>    
</container>
</template>

<script>
import Container from './Container'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { filters } from '@/utils/mixins'
import CartBtn from '@/components/CartBtn'
export default {
    props:{
        salesList:Array
    },
    computed:{
        show(){
            return !!this.salesList.length
        }
    },
    components:{
        Container,
        Swiper,
        SwiperSlide,
        CartBtn
    },
    mixins:[filters],
    watch: {
        salesList(newVal){
            const pages = []
            newVal.forEach((val,index) => {
                let page = Math.floor(index / 2)
                if(!pages[page]){
                    pages[page] = []
                }
                pages[page].push(val)
            });
            this.pages = pages
        }
    },
    data() {
        return {
            pages:[],
            swiperOptions: {
               pagination: {
                    el: '.swiper-pagination'
                }
            }
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/global';
.swiper-container{
    width:100%;
    height:4.4rem;
    margin-top:.2rem;
    .swiper-page{
        width:100%;
        height:4rem;
        @include layout-flex($justify:space-between);
        .swiper-goods{
            width:3.44rem;
            height:100%;
            border-radius: .1rem;
            overflow: hidden;
            @include layout-flex(column);
            .goods-img{
                width:100%;
                height:2.66rem;
            }
            .goods-info{
                height:0;
                flex:1;
                margin:.1rem 0 .2rem .1rem;
                @include layout-flex(column,space-between,flex-start);
                .val-name{
                    width:90%;
                    height:.3rem;
                    line-height:.3rem;
                    font-size:.2rem;
                    color:$color-d;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    font-weight:600;
                }
                .val-price{
                    font-weight:600;
                    font-size:.28rem;
                    color:$color-a;
                }
            }
        }
    }
    
    /deep/.swiper-pagination-bullet-active{
        background-color: $color-a;
        opacity: 1;
    }
    /deep/.swiper-pagination-bullets{
        bottom:0px;
    }
}
</style>