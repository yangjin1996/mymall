<template>
<div class="goodsInfo" style="background-color:#fff">
    <div class="price">￥<span>{{goods.goods_price}}</span></div>
    <div class="markrtPrice">价格：<span>{{goods.market_price}}</span></div>
    <div class="title">{{goods.goods_name}}</div>
    <div class="goodsNum">
        <span>月销量{{goods.sale_num}}件</span>
        <span>库存{{goods.stock}}件</span>
    </div>
</div>
</template>

<script>
export default {
 props:{
     goods:{
         type:Object,
     }
 }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.goodsInfo{
  padding:.2rem;
  box-sizing:border-box;
}
.price{
  font-size:.28rem;
  color:$color-a;
  font-weight:550;
  span{
    color:$color-a;
    font-weight:550;
    font-size:.4rem;
  }
}
.markrtPrice{
  margin:.2rem 0;
  font-size:.3rem;
  color:$color-e;
  span{
    text-decoration: line-through;
  }
}
.title{
  margin:.2rem 0;
  line-height: .36rem;
}
.goodsNum{
  color:$color-e;
  display: flex;
  justify-content: space-between;
}

</style>