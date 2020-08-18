<template>
<div class="page">
  <common-header title="我的积分" back="/user"></common-header>
  <div v-show="pointsList.length">
    <ul class="day-news" v-for="item of pointsList" :key="item.id">
      <li class="time">
        <div class="title">{{item.add_time|dateFormat}}</div>
      </li>
      <li class="news">
        <span class="notice">{{item.content}}</span>
        <p class="text">{{item.type === 1 ? '+' : '-'}}{{item.points}}积分</p>
      </li>
    </ul>
  </div>
  <div class="no-points" v-show="!pointsList.length">
    没有查询到结果
  </div>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import {dateFormat} from '@/utils/function'
import {Token} from "@/utils/token"
export default {
  components:{
    CommonHeader
  },
  data() {
    return {
      page:1,
      count:8,
      status:-1,
      pointsList:[]
    }
  },
  filters:{
    dateFormat(date){
      return dateFormat('YYYY年mm月dd日',new Date(date * 1000))
    }
  },
  mounted(){
    this.getpoints()
  },
  methods: {
    async getpoints(){
      const token = Token.getToken();
      this.$showLoading();
      const points = await this.axios.get('shose/user/points',{
        headers:{
          token
        },
        params:{
          pages:1,
          count:8,
          type:this.status
        }
      })
      this.pointsList = points.list;
      this.$hideLoading();
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.page{
  width:100%;
  height:100vh;
  padding:$header-h 0 .9rem;
  box-sizing: border-box;
  background:#fff;
  .no-points{
    width:100%;
    height:2rem;
    font-size: .28rem;
    color:#999;
    @include layout-flex;
  }
  .day-news{
    width:100%;
    padding: 0 .2rem;
    box-sizing: border-box;
    .time{
      width:100%;
      height:.7rem;
      font-size: .32rem;
      color:#333;
      @include layout-flex;
    }
    .news{
      width:100%;
      padding:.2rem;
      line-height: .46rem;
      color:#666;
      box-sizing: border-box;
      border-radius: .1rem;
      background-color: #eee;
      .notice{
        font-size: .3rem;
      }
      .text{
        font-size: .28rem;
      }
    }
  }
}
</style>