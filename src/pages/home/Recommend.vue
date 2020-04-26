<template>
<div class="recommend-container" v-if="show">
    <div class="title">
        <span>精品推荐</span>
        <span class="iconfont more">更多 &#xe675;</span>
    </div>
    <div class="goods-list-container" ref="wrapper">
        <div class="goods-list" ref="recommend">
            <div class="goods-item border" v-for="item of recommendList" :key="item.id">
                <img :src="item.img" class="goods-img">
                <div class="goods-info">
                    <div class="goods-name">{{item.name}}</div>
                    <div class="goods-price">￥{{item.price|formatPrice}}</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import BScroll from 'better-scroll'
import { formatPrice } from '@/utils/function'
export default {
    props:{
        recommendList:Array
    },
    computed: {
        show(){
            return !!this.recommendList.length
        }
    },
   watch:{
        recommendList(newList){
            if(newList.length > 0){
                this.$nextTick(()=>{
                    this.initScroll()
                })
            }
        }
    },
    data() {
        return {
            scroll:null,
            scrollOptions:{
                startX: 0,
                click: true,
                scrollX: true,
                scrollY: false,
                eventPassthrough: 'vertical'// 忽略竖直方向的滚动
            }
        }
    },
    filters:{
        formatPrice(price){
            return formatPrice(price)
        }
    },
    methods: {
        initScroll(){
            const goodsListWidth = this.recommendList.length * 2.2
            this.$refs.recommend.style.width = goodsListWidth + "rem"
            console.log(this.$refs.recommend.style.width)
            if (!this.scroll) {
                
                this.scroll = new BScroll(this.$refs.wrapper,this.scrollOptions)
                } else {
                this.scroll.refresh() // 重新属性BScroll状态
            }
        }
    },
}
</script>

<style lang='scss' scoped>
@import '~@/assets/scss/global';
.recommend-container{
    @include container-layout(4.1rem);
    .title{
        widdth:100%;
        height:.32rem;
        @include layout-flex($justify:space-between);
        border-left:.06rem solid $color-a;
        text-indent:.2rem;
        color:$color-b;
        font-weight:600;
        font-size:.32rem;
        .more{
            color:$color-d;
            font-size:.24rem;
            font-weight:400;
        }
    }
    .goods-list-container{
        width:100%;
        height:3.2rem;
        margin-top:.2rem;
        overflow:hidden;
        .goods-list{
            height:100%;
            @include layout-flex();
            .goods-item{
                width:2rem;
                height:100%;
                margin-right:.2rem;
                border-radius:.1rem;
                overflow:hidden;
                 @include layout-flex(column);
                 .goods-img{
                     width:100%;
                     height:2.08rem;
                 }
                 .goods-info{
                     height:0;
                     flex:1;
                     margin:.1rem 0 .2rem;
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
    }
}

</style>