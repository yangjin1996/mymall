<template>
<container title="为你推荐">
    <template v-slot:content>
        <div class="goods-list">
            <div class="goods-item border" v-for="item of goodsList" :key="item.id">
                <img v-lazy="item.img" class="goods-img">
                <div class="goods-info">
                    <div class="goods-name">{{item.name}}</div>
                    <div class="goods-price">￥{{item.price|formatPrice}}</div>
                    <cart-btn font-size=".32rem" :goods="item"></cart-btn>
                </div>
            </div>
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
        goodsList:Array
    },
    components:{
        Container,
        CartBtn
    },
    mixins:[filters],
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.goods-list{
    height:auto;
    margin-top:.2rem;
    @include layout-flex($justify:space-between);
    flex-wrap: wrap;
    .goods-item{
        width:3.35rem;
        height:4rem;
        margin-right:.2rem;
        margin-bottom:.2rem;
        border-radius:.1rem;
        overflow:hidden;
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
            .goods-name{
                width:90%;
                height:.3rem;
                line-height:.3rem;
                font-size:.2rem;
                color:$color-d;
                overflow:hidden;
                text-overflow:ellipsis;
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