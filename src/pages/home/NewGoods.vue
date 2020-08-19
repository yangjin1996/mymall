<template>
<container title="新品优选" morePath="/goodsList">
    <template v-slot:content>
        <div class="goods-list">
            <router-link tag="div" class="goods-item border" v-for="item of list" :key="item.id" :to="`/goods-detail/${item.id}`">
                <img v-lazy="item.img" class="goods-img">
                <div class="goods-info">
                    <div class="goods-name">{{item.name}}</div>
                    <div class="goods-price">￥{{item.price|formatPrice}}</div>
                    <cart-btn font-size=".32rem" :goods="item"></cart-btn>
                </div>
            </router-link>
        </div>
    </template>
</container>
</template>

<script>
import Container from './Container'
import { filters } from '@/utils/mixins'
import CartBtn from '@/components/CartBtn'
export default {
    props:{
        newGoodsList:Array
    },
    components:{
        Container,
        CartBtn
    },
    mixins:[filters],
    watch: {
        newGoodsList(newList){
            this.list = newList.slice(0,3)
        }
    },
    data() {
        return {
            list:[]
        }
    },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.goods-list{
    height:3.2rem;
    margin-top:.2rem;
    @include layout-flex($justify:space-between);
    .goods-item{
        width:2.2rem;
        height:100%;
        margin-right:.2rem;
        border-radius:.1rem;
        overflow:hidden;
        @include layout-flex(column);
        .goods-img{
            width:100%;
            height:2.1rem;
        } 
        .goods-info{
            width:100%;
            height:0;
            padding-left: .1rem;
            flex:1;
            margin:.1rem 0 .2rem .1rem;
            @include layout-flex(column,space-between,flex-start);
            box-sizing: border-box;
            .goods-name{
                width:90%;
                height:.3rem;
                line-height:.3rem;
                font-size:.2rem;
                color:$color-d;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight:600;
            }
            .goods-price{
                font-weight:600;
                font-size:.28rem;
                color:$color-a;
            }
        }
    }
}
</style>