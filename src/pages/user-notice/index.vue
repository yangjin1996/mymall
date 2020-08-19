<template>
<div class="page">
  <common-header title="我的消息" back="/user"></common-header>
  <div class="new-page" ref="newsPage">
    <div class="box">
      <ul class="day-news" v-for="item of newsList" :key="item.id">
        <li class="time">
          <div class="title">{{item.time|dateFormat}}</div>
        </li>
        <li class="news">
          <span class="notice">{{item.title}}</span>
          <p class="text">{{item.content}}</p>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import CommonHeader from '@/components/Header'
import {dateFormat} from '@/utils/function'
import {Token} from "@/utils/token"
export default {
  components:{
    CommonHeader
  },
  data() {
    return {
      newsList:[]
    }
  },
  filters:{
    dateFormat(date){
      return dateFormat('YYYY年mm月dd日',new Date(date * 1000))
    }
  },
  mounted(){
    this.getNews();
    this.initScroll();
  },
  methods: {
    async getNews(){
      const token = Token.getToken();
      this.$showLoading();
      const news = await this.axios.get('shose/notice',{
        headers:{
          token
        },
        params:{
          pages:1,
          count:8
        }
      })
      this.newsList = news.list;
      this.$hideLoading();
    },
    initScroll(){
      const html = document.querySelector('html')
      const fontSize = window.innerWidth / 7.5
      html.style.fontSize = fontSize + 'px'
      this.$refs.newsPage.style.height = window.innerHeight - fontSize*0.9 + 'px'
      new BScroll('.new-page',{
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
  height:100%;
  padding:1.1rem 0 .2rem;
  box-sizing: border-box;
  background:#fff;
  .new-page{
    width:100%;
    overflow: hidden;
    .box{
      margin-bottom: .2rem;
    }
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
        font-size: .28rem;
      }
      .text{
        font-size: .24rem;
      }
    }
  }
}
</style>