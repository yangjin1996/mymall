<template>
<div>
  <detail-header :showIconMenu="showIconMenu" :opacity="headerOpacity" :scrollTab="scrollTab" @tab="changeTab"></detail-header>
  <div class="page" ref="page">
    <div style="height:3000px">
      <div class="goods">
        <detail-gallery :gallery="gallery"></detail-gallery>
      </div>
      <goods-info :goods="goods"></goods-info>
      <!--商品基本信息
      <div class="goodsInfo" style="height:100px;background-color:#fff">
        <div class="price">￥<span>299</span></div>
        <div class="markrtPrice">价格：<span>304</span></div>
        <div class="title">性感单鞋女低跟</div>
        <div class="goodsNum">
          <span>月销量502件</span>
          <span>库存2000件</span>
        </div>
      </div>-->
      <!--优惠信息-->
      <div class="sale" style="height:100px;background-color:#fff;margin-top:.2rem;">
        <ul>
          <li class="discounts">
            <div>
              <span>优惠</span>
              <span>领取优惠券</span>
            </div>
            <div>
              领取
              <span class="iconfont">&#xe62a;</span>
            </div>
          </li>
          <li class="integral">
            <span>促销</span>
            <span>积分</span>
            <span>购买可得{{goods.point}}积分</span>
            <span class="iconfont">&#xe62a;</span>
          </li>
          <li class="server">
            <span>服务</span>
            <span>假一赔四</span>
            <span>30天质保+</span>
            <span>急速退款</span>
            <span class="iconfont">&#xe62a;</span>
          </li>
          
        </ul>
      </div>
      <!--用户评论-->
      <div id="comment" class="comment" style="height:100px;background-color:#fff;margin-top:.2rem;">
        <div class="head">
          <span>商品评价（{{comment.count}}）</span>
          <span class="iconfont" v-if="comment.count > 0">查看全部&#xe62a;</span>
        </div>
        <div class="commentContent">
          <span>张三</span>
          <span>13333333333</span>
          <p>好评</p>
        </div>
      </div>
      <!--详情-->
      <div id="detail">
        <div class="line"><p>详情</p></div>
        <div class="img">
          <img :src="item" v-for="(item, i) in goods.content" :key="i">
        </div>
      </div>
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
import GoodsInfo from "./GoodsInfo"
export default {
  props:{
    id:Number
  },
  components:{
    DetailHeader,
    DetailGallery,
    GoodsInfo
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
      this.scroll.scrollToElement('#' + tabName,500,0,-50)
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
.integral{
  display:flex;
  span:nth-child(2){
    margin:0 .2rem;
  }
  span:nth-child(4){
    flex:1;
    text-align:right;
  }
}
.discounts{
  display:flex;
  justify-content:space-between;
}
.server{
  display:flex;
  justify-content:space-between;
}
#detail{
  margin-top:.4rem;
  .line{
    width:2.5rem;
    height:.02rem;
    background-color:#333;
    margin:0 auto;
    position:relative;
    p{
      padding:0 .2rem;
      background-color:#eee;
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
    }
  }
  .img{
    margin-top:.4rem;
    img{
      width:100%;
    }
  }
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