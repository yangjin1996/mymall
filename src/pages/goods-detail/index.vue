<template>
<div>
  <detail-header :showIconMenu="showIconMenu" :opacity="headerOpacity" :scrollTab="scrollTab" @tab="changeTab"></detail-header>
  <div class="page" ref="page">
    <div style="height:3000px">
      <div class="goods">
        <detail-gallery :gallery="gallery"></detail-gallery>
      </div>
      <div style="height:200px;">商品</div>
      <div style="height:200px;" id="comment">评论</div>
      <div id="detail">详情</div>
    </div>
  </div>
  <div class="footer border-top">
    <div class="footer-left">
      <div class="footer-cell" @click="$router.push('/')">
        <span class="iconfont">&#xe609;</span>
        首页
      </div>
      <div class="footer-cell">
        <span class="iconfont">&#xe62b;</span>
        客服
      </div>
      <div class="footer-cell" :class="{collect:isCollect}" @click="collect">
        <span class="iconfont">&#xe60b;</span>
       {{isCollect?'已收藏':'收藏'}}
      </div>
    </div>
    <div class="footer-right">
      <div class="buy">立即购买</div>
      <div class="cart">加入购物车</div>
    </div>
  </div>
</div>
</template>

<script>
import BScroll from "better-scroll"
import DetailHeader from "./Header"
import DetailGallery from "./Gallery"
export default {
  props:{
    id:Number
  },
  components:{
    DetailHeader,
    DetailGallery
  },
  data(){
    return{
      isCollect:false,
      scrollTab:'goods',
      showIconMenu:true,
      headerOpacity:0,
      comment:{},
      gallery:[],
      goods:{},
      scroll:null,
      scrollOptions:{
        startY:0,
        click:true,
        scrollX:false,
        scrollY:true,
        probeType:3,
        scrollbar:false
      }
    }
  },
  mounted(){
    this.getGoods()
    this.initScroll()
    this.initCollect()
  },
  methods:{
    async initCollect(){
      //判断是否登陆
    },
    collect(){
      //判断是否登陆
      // 如果没有登陆，则跳转至登陆页面
      // 如果已经地登陆，判断是收藏还是取消收藏
    },
    changeTab(tabName){
      this.scrollTab = tabName
      this.scroll.scrollToElement('#' + tabName,1000,0,-50)
    },
    initScroll(){
      this.$nextTick(() => {
        if(!this.scroll){
          this.scroll = new BScroll(this.$refs.page,this.scrollOptions)
        }else{
          this.scroll.refresh()
        }
        this.scroll.on('scroll',position => {
          const y = Math.abs(position.y)
          const headerOpacity = y / 150
          this.headerOpacity = headerOpacity > 1 ? 1: headerOpacity
          if (y > 50) {
            this.showIconMenu = false
          }else{
            this.showIconMenu = true
          }
        })
        
      })
    },
    getGoods(){
      this.axios.get(`api/goods?goods_id=${this.id}`).then(result => {
        const {comment:commentList,commentTotal,gallery,goods} = result
        this.comment = {
          list:commentList,
          count:commentTotal
        }
        this.gallery = gallery
        this.goods = goods
        console.log(this.comment,this.goods);
        
      }).catch(err => {
        console.log(err)
        this.$router.replace('/goods-error')
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.page{
  width:100%;
  height:600px;
  background:$color-c;
  overflow: hidden;
}
.footer{
  width:100%;
  height:1rem;
  position: fixed;
  left:0;
  bottom:0;
  background-color: #fff;
  @include layout-flex;
  .footer-left{
    width:0;
    flex:1;
    height:100%;
    @include layout-flex;
    color:$color-e;
    .footer-cell{
      width:33.33%;
      @include layout-flex(column);
      font-size: .26rem;
      .iconfont{
        margin-bottom:.1rem;
      }
      &.collect{
        color:rgb(189, 11, 11);
      }
    }
  }
  .footer-right{
    width:4.5rem;
    height:100%;
    @include layout-flex;
    background-color: $color-a;
    .buy,.cart{
      width:50%;
      height:100%;
      color:#fff;
      @include layout-flex;
      font-size: .3rem;
    }
    .buy{
      background-color: rgb(189, 11, 11);
    }
  }
}
</style>