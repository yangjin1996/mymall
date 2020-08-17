<template>
<div class="wrapper">
  <common-header title="订单详情" :back="backUrl"></common-header>
  <div class="order-status">
    <span class="status">{{handelStatus(order.status)}}</span>
    <span class="iconfont">&#xe612;</span>
  </div>
  <div class="address-container">
    <span class="iconfont">&#xe606;</span>
    <div class="address">
      <span class="name">{{nameInfo}} <span class="phone">{{phone}}</span></span>
      <div class="address-detail">{{address}}</div>
    </div>
  </div>
  <ul class="order-detail">
    <li class="order-cell" v-for="item of order.goods" :key="item.goods_id">
      <div class="order-info">
        <img class="img" :src="item.goods_img">
        <div class="goods-title-price">
          <span class="goods-title">{{item.goods_name}}</span>
          <span class="goods-price">￥{{item.goods_price}}</span>
        </div>
        <div class="goods-count">
          <span class="buy-number">X{{item.buy_number}}</span>
          <span class="to-order">退换</span>
        </div>
      </div>
    </li>
    <li class="order-msg">
      <div class="cell">
        <span class="title">商品数量：</span>
        <p class="contain">X{{order.total_count}}</p>
      </div>
      <div class="cell">
        <span class="title">优惠券金额：</span>
        <p class="contain">-￥{{order.coupon_money}}</p>
      </div>
      <div class="cell">
        <span class="title">商品总价：</span>
        <p class="contain money">￥{{order.total_price}}</p>
      </div>
    </li>
  </ul>
  <div class="order-num">
    <div class="cell">
      <span class="title">订单编号：</span>
      <p class="contain">{{order.order_no}}</p>
    </div>
    <div class="cell">
      <span class="title">创建时间：</span>
      <p class="contain">{{order.create_time|dateFormat}}</p>
    </div>
  </div>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import {dateFormat} from '@/utils/function'
import {Token} from '@/utils/token'
export default {
  components:{
    CommonHeader
  },
  data(){
    return {
      id:0,
      backUrl:'/user-order',
      order:{},
      nameInfo:'',
      phone:'',
      address:'',
      payType:1
    }
  },
  filters:{
    dateFormat(date){
      return dateFormat('YYYY-mm-dd  HH:MM:SS',new Date(date * 1000))
    }
  },
  mounted(){
    this.id = parseInt(this.$route.query.id)
    this.getOrder();
  },
  methods: {
    async getOrder(){
      const token = Token.getToken()
      this.$showLoading();
      const order = await this.axios.get('shose/order',{
        params:{
          id:parseInt(this.id)
        },
        headers:{
          token
        }
      }).then(res => {
        this.order = res.order;
        const address = res.order.address;
        this.address = address.province + address.city + address.area + address.address;
        this.nameInfo = address.name;
        this.phone = address.phone;
        this.$hideLoading();
      })
    },
    handelStatus(status){
      if(status === 1){
        return '订单待付款'
      }
      if(status === 2){
        return '卖家待发货'
      }
      if(status === 3){
        return '待收货'
      }
      if(status === 4){
        return '订单已完成'
      }
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.wrapper{
  width:100%;
  padding-top:$header-h;
  box-sizing: border-box;
  background-color: #eee;
  .order-status{
    width:100%;
    height:3rem;
    padding:.4rem .9rem;
    background-color: $color-a;
    color:#fff;
    box-sizing: border-box;
    @include layout-flex($justify:space-between);
    .status{
      font-size: .34rem;
    }
    .iconfont{
      font-size: 1.6rem;
    }
  }
  .address-container{
    width:100%;
    height:1.6rem;
    padding:.2rem;
    box-sizing: border-box;
    @include layout-flex($justify:flex-start);
    background-color: #fff;
    .iconfont{
      width:.6rem;
      height:.6rem;
      border-radius: 50%;
      font-size: .3rem;
      color:#fff;
      background-color: $color-a;
      @include layout-flex;
    }
    .address{
      height:100%;
      margin-left:.4rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .name{
        font-size: .28rem;
        color:#333;
        .phone{
         font-size: .26rem;
          color:#999; 
        }
      }
      .address-detail{
        font-size: .28rem;
        color:#333;
        line-height: .34rem;
      }
    }
  }
  .order-detail{
    margin-top:.2rem;
    background-color: #fff;
    .order-cell{
      width:100%;
      height:2.4rem;
      padding:.2rem;
      border-radius: .1rem;
      box-sizing: border-box;
      .order-info{
        width:100%;
        height:2rem;
        @include layout-flex($justify:flex-start);
        .img{
          width:2rem;
          height:2rem;
          border-radius: .05rem;
        }
        .goods-title-price{
          height:100%;
          margin-left:.2rem;
          padding:.2rem 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width:0;
          flex:1;
          box-sizing: border-box;
          .goods-title{
            font-size: .28rem;
            color:#666;
            line-height: .38rem;
            // overflow: hidden;
            // text-overflow: ellipsis;
            // white-space: nowrap;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .goods-price{
            font-size: .32rem;
            color:$color-a;
          }
        }
        .goods-count{
          height:100%;
          padding:.2rem 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          box-sizing: border-box;
          .buy-number{
            font-size: .28rem;
            color:#666;
          }
          .to-order{
            width:1.2rem;
            height:.5rem;
            border:1px solid #aaa;
            border-radius: .25rem;
            font-size: .22rem;
            color:#aaa;
            @include layout-flex;
          }
        }
      }
    }
    .order-msg{
      width:100%;
      padding:0 .2rem;
      box-sizing: border-box;
      background-color: #fff;
      .cell{
        width:100%;
        height:.4rem;
        @include layout-flex($justify:space-between);
        .title{
          width:1.7rem;
          font-size: .24rem;
          color:#aaa;
        }
        .contain{
          margin-left:.2rem;
          font-size: .24rem;
          color:#aaa;
          &.money{
            color:$color-a;
          }
        }
      }
    }
  }
  .order-num{
    margin-top:.2rem;
    padding:0 .2rem;
    box-sizing: border-box;
    background-color: #fff;
    .cell{
      width:100%;
      height:.6rem;
      @include layout-flex($justify:flex-start);
      .title{
        width:1.7rem;
        font-size: .28rem;
        color:#333;
      }
      .contain{
        margin-left:.2rem;
        font-size: .28rem;
        color:#333;
      }
    }
  }
}
</style>