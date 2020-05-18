<template>
<div class="page" v-if="show">
  <common-header title="订单支付"></common-header>
  <div class="order-status">
    <span class="iconfont">&#xe612;</span>
    <span>买家{{order.statusInfo}}</span>
    <span>您的包裹已蓄势待发~</span>
  </div>
  <div class="order-total">
    实付款：<span>￥{{order.orderTotal}}</span>
  </div>
  <div class="order-address">
    <div class="row">
      <span>收货人：</span>
      <p>{{order.address.name}}</p>
    </div>
    <div class="row">
      <span>手机号：</span>
      <p>{{order.address.phone}}</p>
    </div>
    <div class="row">
      <span>收货地址：</span>
      <p>{{order.address.province}}{{order.address.city}}{{order.address.area}}{{order.address.address}}</p>
    </div>
  </div>
  <div class="chose-pay" v-if="order.status <= 1">
    <div class="pay-cell" :class="{active:payType===1}" @click="payType=1">
      <img src="@/assets/images/alipay.svg">
    </div>
    <div class="pay-cell" :class="{active:payType===2}" @click="payType=2">
      <img src="@/assets/images/wepay.svg">
    </div>
  </div>
  <div class="operation">
    <span class="operation-btn" v-if="order.status <= 1">支付订单</span>
    <span class="operation-btn" v-else>查看订单</span>
    <router-link to="/" class="operation-btn">返回首页</router-link>
  </div>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import {Token} from '@/utils/token'
import {getOrderStatus,formatPrice} from '@/utils/function'
export default {
  components:{
    CommonHeader
  },
  data(){
    return {
      orderId:0,
      order:{},
      payType:1
    }
  },
  mounted(){
    this.orderId = parseInt(this.$route.query.id)
    this.getOrder()
  },
  computed:{
    show(){
      return !!Object.keys(this.order).length
    }
  },
  methods: {
    async getOrder(){
      const token = Token.getToken()
      const order = await this.axios.get('shose/order',{
        params:{
          id:this.orderId
        },
        headers:{
          token
        }
      }).then(res => res.order)
      order.statusInfo = getOrderStatus(order.status)
      order.orderTotal = formatPrice(order.total_price)
      // console.log(order)
      this.order = order
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.page{
  width:100%;
  height:100%;
  padding-top:$header-h;
}
.order-status{
  width:100%;
  height:3.3rem;
  background:$color-a;
  @include layout-flex(column);
  color:#fff;
  font-size: .36rem;
  line-height:1.3em;
  .iconfont{
    font-size:1.2rem;
    margin-bottom:.4rem;
  }
}
.order-total{
  width:100%;
  height:1rem;
  @include layout-flex;
  font-size:.32rem;
  color:$color-b;
  span{
    color:$color-a;
  }
}
.order-address{
  width:100%;
  padding:0 .4rem;
  color:$color-e;
  font-size: .28rem;
  box-sizing: border-box;
  .row{
    width:100%;
    margin-bottom: .2rem;
    @include layout-flex;
    span{
      width:1.4rem;
      height:100%;
    }
    p{
      width:0;
      flex:1;
      height:100%;
    }
  }
}
.chose-pay{
  width:100%;
  height:1rem;
  margin-top:.4rem;
  @include layout-flex;
  .pay-cell{
    width:40%;
    height:100%;
    @include layout-flex;
    border:1px solid #fff;
    box-sizing: border-box;
    img{
      height:.8rem;
      width:.8rem;
    }
    &.active{
      border-radius: .2rem;
      border:1px solid $color-a;
    }
  }
}
</style>