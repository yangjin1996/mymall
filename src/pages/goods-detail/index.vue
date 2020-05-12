<template>
<div>
  <detail-header :showIconMenu="showIconMenu" :opacity="headerOpacity" :scrollTab="scrollTab" @tab="changeTab"></detail-header>
  <div class="page" ref="page">
    <div>
      <div class="goods">
        <detail-gallery :gallery="gallery"></detail-gallery>
      </div>
      <!--商品基本信息-->
      <goods-info :goods="goods"></goods-info>
      <!--优惠信息-->
      <div class="sale">
        <ul>
          <li class="discounts">
            <div>
              <span class="message">优惠</span>
              <span class="receive" @click="getCoupon">领取优惠券</span>
            </div>
            <div>
              领取
              <span class="iconfont message">&#xe62a;</span>
            </div>
          </li>
          <li class="integral">
            <span class="message">促销</span>
            <span class="credits">积分</span>
            <span>购买可得{{goods.point}}积分</span>
            <span class="iconfont message">&#xe62a;</span>
          </li>
          <li class="server">
            <span class="message">服务</span>
            <span>假一赔四</span>
            <span>30天质保+</span>
            <span>急速退款</span>
            <span class="iconfont message">&#xe62a;</span>
          </li>
        </ul>
      </div>
      <!--用户评论-->
      <div id="comment" class="comment">
        <div class="head">
          <span>商品评价（{{comment.count}}）</span>
          <span class="iconfont" v-if="comment.count > 0">查看全部&#xe62a;</span>
        </div>
        <div class="commentContent" v-for="(item,index) in comment.list" :key="index">
          <div>
            <span>{{item.username}}</span>
            <span>{{item.add_time}}</span>
          </div>
          <p>{{item.content}}</p>
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
import {Token} from '@/utils/token'
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
      const token = Token.getToken()
      if(token === ''){
        this.isCollect = false
        return
      }
      this.axios.get('shose/collect/check',{
        params:{
          goods_id:this.id
        },
        headers:{
          token
        }
      }).then(res => {
        this.isCollect = res.collect === 1
      })
    },
    async collect(){
      //判断是否登陆
      const token = Token.getToken()
      if(token === ''){
        const url = encodeURIComponent('/goods-detail/' + this.id)
        this.$router.push(`/login?url=${url}`)
        return
      }
      // 如果没有登陆，则跳转至登陆页面
      // 如果已经地登陆，判断是收藏还是取消收藏
      let path = ''
      if(this.isCollect){
        path = 'shose/collect/cancel'
      }else{
        path = 'shose/collect/confirm'
      }
      this.$showLoading()
      await this.axios.post(path,{goods_id:this.id},{
        headers:{
          token
        }
      })
      this.$hideLoading()
      this.isCollect = !this.isCollect
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
    },
    getCoupon(){},
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
.sale{
  margin-top:.2rem;
  background-color: #fff;
  padding:.2rem;
  box-sizing: border-box;
}
.discounts{
  display:flex;
  justify-content:space-between;
  .receive{
    margin-left:.2rem;
  }
}
.message{
  color:$color-e;
}
.integral{
  margin:.2rem 0;
  .credits{
    color:$color-a;
  }
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
    background-color:#666;
    margin:0 auto;
    position:relative;
    p{
      color:#666;
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
.iconfont{
  font-size: .24rem;
}
.comment{
  background-color:#fff;
  margin-top:.2rem;
  padding:.2rem;
  box-sizing: border-box;
  .commentContent{
    margin:.15rem 0;
    div{
      display: flex;
      justify-content: space-between;
    }
    p{
      line-height:.32rem;
    }
  }
  .head{
    display: flex;
    justify-content: space-between;
    .iconfont{
      color:$color-a;
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