<template>
<div class="page">
  <common-header title="我的卡券" :back="'/user'"></common-header>
  <div class="wrap" ref="newsPage">
    <ul class="coupon-container">
      <li class="coupon" v-for="item of coupon" :key="item.id">
        <div class="coupon-img"><img :src="imgList[handelTime(item)]" /></div>
        <div class="coupon-money">
          <p class="money">￥<span class="num">{{parseInt(item.money)}}</span>优惠券</p>
          <p class="money-time">{{item.get_time|dateFormat}}-{{item.expires_time|dateFormat}}</p>
        </div>
        <div class="coupon-status">
          <div class="text" :class="{
            status1:handelTime(item) === 0,
            status2:handelTime(item) === 1,
            status3:handelTime(item) === 2,
            }">{{textList[handelTime(item)]}}</div>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import CommonHeader from '@/components/Header'
import {dateFormat} from '@/utils/function'
import {Token} from '@/utils/token'
export default {
  name:"UserCoupon",
  components:{
    CommonHeader
  },
  data() {
    return {
      coupon:[],
      imgList:[
        'images/coupon1.png',
        'images/coupon3.png',
        'images/coupon2.png',
      ],
      textList:[
        '优惠抵扣',
        '已经失效',
        '已经使用'
      ]
    }
  },
  filters:{
    dateFormat(date){
      return dateFormat('YYYY.mm.dd',new Date(date * 1000))
    }
  },
  async mounted(){
    await this.getUserCoupon();
    this.initScroll();
  },
  methods: {
    async getUserCoupon(){
      this.$showLoading();
      const token = Token.getToken()
      const coupon = await this.axios.get('shose/coupon/get',{
        headers:{
          token
        }
      })
      this.coupon = coupon.coupon;
      this.$hideLoading();
    },
    handelTime(item){
      if(item.expires_time*1000 > Date.now() && item.is_use === 0){
        return 0
      }
      if(item.expires_time*1000 < Date.now()){
        return 1
      }
      if(item.is_use === 1){
        return 2
      }
    },
    initScroll(){
      const html = document.querySelector('html')
      const fontSize = window.innerWidth / 7.5
      html.style.fontSize = fontSize + 'px'
      this.$refs.newsPage.style.height = window.innerHeight - fontSize*0.9 + 'px'
      new BScroll('.wrap',{
        scrollY: true,
        click: true,
      })
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.page{
  width:100%;
  height:100vh;
  padding-top:$header-h;
  box-sizing: border-box;
  background-color: #fff;
}
.wrap{
  width:100%;
  overflow: hidden;
}
.coupon-container{
  width:100%;
  margin-bottom: .2rem;
  @include layout-flex($dirction:column,$justify:flex-start);
  .coupon{
     width:5.8rem;
     height:2.3rem;
     margin-top:.4rem;
     position: relative;
     .coupon-img{
       width:100%;
       height:100%;
       img{
         width:100%;
          height:100%;
       }
     }
     .coupon-money{
       width:3.48rem;
       height:2.32rem;
       color:#fff;
       padding:.6rem 0 .4rem 0;
       box-sizing: border-box;
       @include layout-flex($dirction:column,$justify:space-between);
       position: absolute;
       left:0;
       top:0;
       .money{
         font-size: .32rem;
         .num{
           font-size: .6rem;
           margin-right:.1rem;
         }
       }
       .money-time{
         font-size: .22rem;
       }
     }
     .coupon-status{
       width:2.4rem;
       height:2.32rem;
       position: absolute;
       right:0;
       top:0;
       @include layout-flex;
       .text{
         width:1.2rem;
         height:1.2rem;
         font-size: .5rem;
         @include layout-flex;
         &.status1{
           color:$color-a;
         }
         &.status3{
           color:#ff7c76;
         }
         &.status2{
           color:#999;
         }
       }
     }
  }
}
</style>