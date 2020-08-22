<template>
<div class="wrap">
  <common-header title="签到" :back="backUrl"></common-header>
  <ul class="week-sign">
    <li class="day-sign" v-for="(item,index) of weekSign" :key="index">
      <span class="time" :class="{today:item.isToday}">{{item.week}}</span>
      <p class="integral" :class="{sign:item.hasData,todaySign:item.isToday}">+10</p>
    </li>
  </ul>
  <div class="user-level-progress">
    <div class="level">
      <div class="serial">
        <p class="num-container">
          已连续签到<span class="serial-time">{{userLevelPoints.serial_sign}}</span>天
        </p>
        <p class="sign-container" @click="userSign">签到</p>
      </div>
      <div class="user-points">
        <span class="points">{{userLevelPoints.level_points}}</span>
        <span class="next-points">{{userLevelPoints.next_level_points}}</span>
      </div>
      <div class="a-points" ref="myPoints">{{userLevelPoints.points}}</div>
      <progress class="mypro" :value="userLevelPoints.points" :max="userLevelPoints.next_level_points"></progress>
      <div class="user-level">
        <span class="user-level">lv{{userLevelPoints.level}}</span>
        <span class="next-level">lv{{userLevelPoints.next_level}}</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import CommonHeader from "@/components/Header"
import {Token} from "@/utils/token"
const USER_TOKEN = Token.getToken()
export default {
  components:{
    CommonHeader
  },
  data() {
    return {
      backUrl:'/user',
      weekSign:[],
      isToday:false,
      userLevelPoints:{},
    }
  },
  mounted() {
    this.getUserSign();
  },
  watch:{
    'userLevelPoints.points'(value){
      if(this.$refs.myPoints){
        this.$refs.myPoints.style.left = value + '%'
      }
    }
  },
  methods: {
    async getUserSign(){
      this.$showLoading()
      await this.axios.get('shose/user/sign?type=2',{
        headers:{
          token:USER_TOKEN
        }
      }).then(res => {
        res.list[res.list.length-1].isToday = true
        this.weekSign = res.list;
        this.userLevelPoints = res.user;
        this.$hideLoading()
      })
    },
    async userSign(){
      this.$showLoading()
      await this.axios.post('shose/user/sign?type=2',{},{
        headers:{
          token:USER_TOKEN
        }
      }).then(() => {
        this.getUserSign()
      }).catch(err => {
        this.$showModal({
          title:err.message
        })
      }).finally(() => {
        this.$hideLoading()
      })
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.wrap{
  width:100%;
  padding-top:$header-h;
  box-sizing: border-box;
  .week-sign{
    width:100%;
    height:1.5rem;
    padding:.2rem .4rem;
    background-color: #fff;
    box-sizing: border-box;
    @include layout-flex($dirction:row,$justify:space-around);
    .day-sign{
      height:100%;
      @include layout-flex($dirction:column,$justify:space-between);
      .time{
        font-size: .3rem;
        color:#999;
        &.today{
          color:#333;
        }
      }
      .integral{
        width:.5rem;
        height:.5rem;
        border-radius: 50%;
        font-size: .26rem;
        color:#999;
         @include layout-flex;
         &.sign{
          background-color: $color-a;
          color:#fff;
        }
        &.todaySign{
          color:#999;
          &.sign{
            background-color: $color-a;
            color:#fff;
          }
        }
      }
    }
  }
  .user-level-progress{
    width:100%;
    height:2.9rem;
    padding:.2rem .4rem;
    box-sizing: border-box;
    .level{
      width:100%;
      height:100%;
      padding:.2rem;
      border-radius: .1rem;
      box-sizing: border-box;
      background-color: $color-a;
      color:#fff;
      position: relative;
      .serial{
        height:1rem;
        line-height: 1rem;
        font-size: .26rem;
        color:#fff;
        @include layout-flex($justify:space-between);
        .num-container{
          .serial-time{
            font-size: .4rem;
          }
        }
        .sign-container{
          color:#fff;
          font-size: .3rem;
        }
      }
      .user-points,.user-level{
        color:#fff;
        height:.44rem;
        @include layout-flex($dirction:row,$justify:space-between);
        span{
          font-size: .32rem;
        }
      }
      .mypro{
        width:100%;
        height:.1rem;
        background-color: #fff;
        margin:.1rem 0;
        border-radius: .05rem;
        appearance: none;
        -webkit-appearance:none;
      }
      ::-ms-fill{
        background-color: #eecf8b;
        border-radius: .05rem;
      }
      ::-moz-progress-bar{
        background-color: #eecf8b;
        border-radius: .05rem;
      }
      ::-webkit-progress-bar{
        background-color: #fff;
        border-radius: .05rem;
      }
      ::-webkit-progress-value{
        background-color: #eecf8b;
        border-radius: .05rem;
      }
      .a-points{
        width:.9rem;
        height:.4rem;
        background-color: #eecf8b;
        color:#fff;
        font-size: .3rem;
        border-radius: .05rem;
        position: absolute;
        left:0;
        top:1.2rem;
        transform: translateX(-50%);
        @include layout-flex;
      }
    }
  }
}
</style>