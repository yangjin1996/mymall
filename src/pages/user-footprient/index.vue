<template>
<div class="wraper">
  <common-header title="我的足迹" :back="backUrl"></common-header>
  <div class="time-container">
    <ul class="week-sign">
      <li class="day-sign" v-for="(item,index) of timeList" :key="index" @click="item.active = 1">
        <span class="time">{{item.week}}</span>
        <p class="integral" :class="{todaySign:item.active === 1}">{{item.day}}</p>
        <p class="number" :class="{hasNum:item.number != 0}"></p>
      </li>
    </ul>
  </div>
  <ul class="day-number" v-for="(item,index) of historyData" :key="index">
    <li class="day-time">{{handelTime(dayList[index])}}</li>
    <router-link tag="li" class="day-cell" v-for="(i,index) of item" :key="index" :to="`/goods-detail/${i.goods_id}`">
      <img :src="i.goods_img" />
      <p class="price">￥{{i.price}}</p>
    </router-link>
  </ul>
</div>
</template>

<script>
import CommonHeader from "@/components/Header"
import {Token} from '@/utils/token.js'
export default {
  components:{
    CommonHeader
  },
  data(){
    return {
      backUrl:'/user',
      timeList:[],
      page:1,
      historyData:[],
      dayList:[],
    }
  },
  mounted(){
    this.getHistoryTime();
    this.getHistoryData();
  },
  methods: {
    async getHistoryTime(){
      const token = Token.getToken();
      this.$showLoading()
      const HistoryTime = await this.axios.get('shose/history/time',{
        headers:{
          token
        }
      });
      this.timeList = HistoryTime
      this.$hideLoading()
    },
    async getHistoryData(){
      const token = Token.getToken();
      this.$showLoading()
      const historyData = await this.axios.get('shose/history/get',{
        params:{
          page:this.page
        },
        headers:{
          token
        }
      });
      this.historyData = this.handelHistoryData(historyData.list).reverse()
      this.$hideLoading()
    },
    handelHistoryData(list){
      let No = 0;
      let arr = [];
      let date = '';
      let dayList = [];
      list.filter((item,index) => {
        if(date && item.day !== date){
          date = item.day;
          No++;
          arr[No] = [];
          arr[No].push(item);
          dayList[No] = item.day.toString();
        }else{
          date = item.day;
          arr[No] = arr[No] || [];
          arr[No].push(item);
          dayList[No] = item.day.toString();
        }
      })
      let newArr = [];
      arr.forEach(item => {
        newArr.unshift(item.reverse())
      })
      this.dayList = dayList.reverse();
      return arr
    },
    handelTime(time){
      let year = time.slice(0,4);
      let month = time.slice(4,6);
      let day = time.slice(6,8);
      return year + '年' + month + '月' + day + '日'
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.wraper{
  width:100%;
  height:100vh;
  background-color: #eee !important;
  padding-top:$header-h;
  box-sizing: border-box;
  .time-container{
    width:100%;
    .week-sign{
      width:100%;
      height:1.75rem;
      padding:.2rem .4rem;
      background-color: #fff;
      box-sizing: border-box;
      @include layout-flex($dirction:row,$justify:space-around);
      .day-sign{
        height:100%;
        @include layout-flex($dirction:column,$justify:space-between);
        .time{
          font-size: .3rem;
          color:#333;
        }
        .integral{
          width:.5rem;
          height:.5rem;
          border-radius: 50%;
          font-size: .26rem;
          color:#333;
          @include layout-flex;
          &.todaySign{
            color:#fff;
            background-color: $color-a;
          }
        }
        .number{
          width:.1rem;
          height:.1rem;
          border-radius: 50%;
          background-color: #fff;
          &.hasNum{
            background-color: $color-a;
          }
        }
      }
    }
  }
  .day-number{
    width:100%;
    padding:.2rem;
    margin-top:.3rem;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    position: relative;
    .day-time{
      font-size: .26rem;
      color:#666;
      line-height: .43rem;
      position: absolute;
      left:.4rem;
      top:-.1rem;
    }
    .day-cell{
      width:2.24rem;
      height:2.6rem;
      margin-top:.2rem;
      background-color: #fff;
      img{
        width:2.24rem;
        height:1.96rem;
      }
      .price{
        color:$color-a;
        font-weight: bold;
        line-height: .6rem;
        padding-left:.2rem;
        box-sizing: border-box;
      }
    }
    .day-cell:nth-child(3n){
      margin-right: .18rem;
      margin-left: .18rem;
    }
  }
}

</style>