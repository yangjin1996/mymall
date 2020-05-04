<template>
<div class="goods-list">
  <div class="goods-item" v-for="item of list" :key="item.id">
    <div class="picture">
      <img class="img" :src="item.img" alt="">
    </div>
    <div class="text">
        <h4>{{item.name}}</h4>
        <div>
            <p class="firstContainer">￥{{item.price|formatPrice}}<span>￥{{item.market_price|formatPrice}}</span></p>
            <p class="secondContainer">{{item.sale_num}}人购买<span>529浏览</span></p>
        </div>
    </div>
    <cart-btn :goods="item"></cart-btn>
    <!-- <div class="buy iconfont">&#xe601;<p class="goodsNumber">{{goodsNum}}</p></div> -->
  </div>
</div>
</template>

<script>
import {filters} from '@/utils/mixins'
import CartBtn from '@/components/CartBtn'
export default {
  props:{
    list:Array
  },
  mixins:[filters],
  components:{
    CartBtn
  }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.goods-list{
    width:100%;
    padding:0 .2rem;
    box-sizing: border-box;
    .goods-item{
      width:100%;
      display: flex;
      margin:.2rem 0;
      padding-bottom: .2rem;
      position: relative;
      .picture{
        width:2.2rem;
        height:2.2rem;
        .img{
          width:2.2rem;
          height:2.2rem;
          border-radius: .1rem;
        }
      }
      .text{
        padding:.2rem 0;
        box-sizing: border-box;
        margin-left:.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h4{
          color:#666;
          font-size: .28rem;
          font-weight: 550;
          line-height: .34rem;
        }
      }
    }
}
// .buy .goodsNumber{
//     width:.4rem;
//     height:.4rem;
//     border-radius: 50%;
//     font-size: .24rem;
//     color: #ff5e46;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     position: absolute;
//     right:-.2rem;
//     top:-.1rem;
// }
.firstContainer{
    margin-bottom: .2rem;
}
.firstContainer{
    font-size: .36rem;
    color: #ff5e46;
}
.firstContainer span{
    font-size: .26rem;
    text-decoration: line-through;
    color:#999;
    font-weight: 550;
    margin-left: .2rem;
}
.secondContainer{
    font-size: .22rem;
    color:#999;
}
.secondContainer span{
    margin-left: .2rem;
}
</style>