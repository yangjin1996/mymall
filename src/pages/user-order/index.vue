<template>
<div class="wrapper">
  <common-header title="我的订单" :back="backUrl"></common-header>
  <div class="tab">
    <ul class="tab-cell">
      <li class="tab-text" :class="{on : status == -1}" @click="getUserOrder(-1)">
        全部
      </li>
      <li class="tab-text" :class="{on : status == 1}" @click="getUserOrder(1)">
        待付款
      </li>
      <li class="tab-text" :class="{on : status == 2}" @click="getUserOrder(2)">
        待发货
      </li>
      <li class="tab-text" :class="{on : status == 3}" @click="getUserOrder(3)">
        待收货
      </li>
      <li class="tab-text" :class="{on : status == 4}" @click="getUserOrder(4)">
        已完成
      </li>
    </ul>
  </div>
  <div class="wrap-container" v-show="userOrder.length">
    <ul class="order-list" v-for="order of userOrder" :key="order.id">
      <li class="order-h">
        <p class="order-headers">
          <span class="order-num">订单编号：{{order.order_no}}</span>
          <span class="order-status">{{handelStatus(order.status)}}</span>
        </p>
      </li>
      <li class="order-cell" 
        v-for="(item,index) of order.goods" 
        :key="index" 
        @click.stop="$router.push('/order-detail?id=' + order.id)">
        <div class="order-info">
          <img class="img" :src="item.goods_img">
          <div class="goods-title-price">
            <span class="goods-title">{{item.goods_name}}</span>
            <span class="goods-price">￥{{item.goods_price}}</span>
          </div>
          <div class="goods-count">
            <span class="buy-number">X{{item.buy_number}}</span>
            <span></span>
          </div>
        </div>
      </li>
      <li>
        <span class="to-order" @click="operateOrder(order)">{{operationList[order.status-1]}}</span>
      </li>
    </ul>
  </div>
  <div class="not-order" v-show="!userOrder.length">
    没有查询到订单
  </div>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import {Token} from '@/utils/token'
export default {
  name:"UserOrder",
  components:{
    CommonHeader
  },
  data(){
    return {
      backUrl:'/',
      page:1,
      count:8,
      status:-1,
      total:0,
      userOrder:[],
      operationList:['去付款','提醒发货','确认收货','退换']
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backUrl = from.path;
      vm.status = parseInt(to.query.status) || -1
    })
  },
  mounted() {
    this.getUserOrder()
  },
  methods: {
    async getUserOrder(status = -1){
      status = status || this.$route.query.status || this.status;
      const token = Token.getToken();
      this.$showLoading();
      const userOrder = await this.axios.get('api/user/order',{
        params:{
          page:this.page,
          count:this.count,
          type:status
        },
        headers:{
          token
        }
      })
      this.status = status;
      this.userOrder = userOrder.list;
      this.total = userOrder.total;
      this.$hideLoading();
    },
    handelStatus(status){
      if(status === 1){
        return '待付款'
      }
      if(status === 2){
        return '待发货'
      }
      if(status === 3){
        return '待收货'
      }
      if(status === 4){
        return '已完成'
      }
    },
    async operateOrder(order){
      if(order.status===3){
        const token = Token.getToken();
        this.$showLoading();
        await this.axios.post('api/user/confirmOrder',{
          headers:{
            token
          },
          params:{
            id:order.id
          }
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.$hideLoading()
        })
      }else if(order.status===2){
        this.$showToast({
          message:'已提醒商家发货'
        })
      }else if(order.status===1){
        this.$router.replace('/order/pay?id=' + order.id)
      }
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.wrapper{
  padding-top: $header-h;
  .tab{
    width:100%;
    height:.8rem;
    padding:0 .4rem;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    .tab-cell{
      width:100%;
      height:100%;
      @include layout-flex($justify:space-around);
      .tab-text{
        height:100%;
        font-size: .32rem;
        color:#666;
        border-bottom: 2px solid #fff;
        @include layout-flex;
        box-sizing: border-box;
        &.on{
          border-bottom: 2px solid $color-a;
        }
      }
    }
  }
  .wrap-container{
    width:100%;
    padding:0 .2rem;
    box-sizing: border-box;
  }
  .order-list{
    width:100%;
    margin-top:.2rem;
    padding:.2rem;
    border-radius: .05rem;
    border:1px solid #eee;
    box-sizing: border-box;
    position: relative;
    .order-h{
      width:100%;
      .order-headers{
        width:100%;
        height:.54rem;
        @include layout-flex($justify:space-between);
        align-items: flex-end;
        .order-num{
          font-size: .28rem;
          color: #999;
        }
        .order-status{
          font-size: .28rem;
          color: $color-a;
        }
      }
    }
    .order-cell{
      width:100%;
      height:2.4rem;
      padding:.2rem;
      margin-top:.2rem;
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
          margin-left:.2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          box-sizing: border-box;
          .buy-number{
            font-size: .28rem;
            color:#666;
          }
        }
      }
    }
    .to-order{
      width:1.28rem;
      height:.52rem;
      background-color: $color-a;
      border-radius: .26rem;
      font-size: .22rem;
      color:#fff;
      @include layout-flex;
      position: absolute;
      right:.2rem;
      bottom: .2rem;
    }
  }
  .not-order{
    width:100%;
    height:3rem;
    font-size: .28rem;
    color:#aaa;
    @include layout-flex;
  }
}
</style>