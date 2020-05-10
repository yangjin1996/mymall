<template>
<div class="goodsInfo" style="height:100px;background-color:#fff">
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
.price{
  font-size:.24rem;
  color:rgb(189, 11, 11);
  font-weight:550;
  span{
    color:rgb(189, 11, 11);
    font-weight:550;
    font-size:.28rem;
  }
}
</style>