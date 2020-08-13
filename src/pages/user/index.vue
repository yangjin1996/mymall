<template>
<div class="page">
  <common-header title="我的"></common-header>
  <div class="user-container">
    <div class="user-wrapper">
      <div class="user-avatar">
        <img :src="user.avatar">
        <input type="file" @change="chooseAvatr" accept="image/*">
      </div>
      <div class="user">
        <div class="nickname" @click="$router.push('/user/info')">{{user.nickname}}<span class="level">lv{{user.level}}</span></div>
        <div class="user-points">积分：<span class="points">{{user.points}}</span></div>
      </div>
      <div class="user-sign iconfont" @click="$router.push('/user-sign')">&#xe8a1; 签到</div>
    </div>
    <div class="order-menu-wrapper">
      <div class="order-menu">
        <div class="title">
          我的订单
          <router-link to="/user" class="iconfont">查看更多 &#xe62a;</router-link>
        </div>
        <div class="menu-list">
          <div class="menu-cell">
            <span class="iconfont">&#xe60a;</span>
            待付款
          </div>
          <div class="menu-cell">
            <span class="iconfont">&#xe612;</span>
            待发货
          </div>
          <div class="menu-cell">
            <span class="iconfont">&#xe611;</span>
            待收货
          </div>
          <div class="menu-cell">
            <span class="iconfont">&#xe754;</span>
            已完成
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="navigate-wrapper">
    <div class="navigate">
      <div class="navigate-cell border-bottom">
        <span class="iconfont icon">&#xe607;</span>
        <div class="navigate-text">我的消息</div>
        <span class="iconfont">&#xe62a;</span>
      </div>
      <div class="navigate-cell border-bottom">
        <span class="iconfont icon">&#xe613;</span>
        <div class="navigate-text" @click="$router.push('/user-collection')">我的收藏</div>
        <span class="iconfont">&#xe62a;</span>
      </div>
      <div class="navigate-cell border-bottom">
        <span class="iconfont icon">&#xe622;</span>
        <div class="navigate-text">我的地址</div>
        <span class="iconfont">&#xe62a;</span>
      </div>
      <div class="navigate-cell border-bottom">
        <span class="iconfont icon">&#xe73b;</span>
        <div class="navigate-text" @click="$router.push('/user-footprient')">我的足迹</div>
        <span class="iconfont">&#xe62a;</span>
      </div>
      <div class="navigate-cell border-bottom">
        <span class="iconfont icon">&#xe769;</span>
        <div class="navigate-text">我的卡券</div>
        <span class="iconfont">&#xe62a;</span>
      </div>
      <div class="navigate-cell border-bottom">
        <span class="iconfont icon">&#xe630;</span>
        <div class="navigate-text">我的积分</div>
        <span class="iconfont">&#xe62a;</span>
      </div>
      <div class="navigate-cell border-bottom">
        <span class="iconfont icon">&#xe6d1;</span>
        <div class="navigate-text">退出</div>
        <span class="iconfont">&#xe62a;</span>
      </div>
    </div>
  </div>
  <common-footer></common-footer>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import CommonFooter from '@/components/Footer'
import {Token} from '@/utils/token'
import event from '@/utils/event'
export default {
  components:{
    CommonHeader,
    CommonFooter
  },
  data(){
    return {
      user:{},
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    async getUser(){
      const token = Token.getToken()
      this.$showLoading()
      const user = await this.axios.get('api/user',{
        headers:{
          token
        }
      })
      this.user = user
      this.$hideLoading()
    },
    chooseAvatr(e){
      if(e.target.files.length > 0){
        const file = e.target.files[0]
        const allowType = ['image/jpeg','image/gif','image/png','image/jpg',]
        if(!allowType.includes(file.type)){
          this.$showToast({
            message:'类型不允许'
          })
          return
        }
        const maxSize = 1024 * 1024
        if(file.size > maxSize){
          this.$showToast({
            message:'图片过大'
          })
          return
        }
        const token = Token.getToken()
        const data = new FormData()
        data.append('image',file)
        this.$showLoading()
        this.axios.post('api/user/avatar',data,{
          headers:{
            token,
            'Content-Type':'multipart/form-data'
          }
        }).then(res => {
          this.user.avatar = res.src
        }).catch(res => {
          this.$showToast({
            message:err.message
          })
        }).finally(() => {
          this.$hideLoading()
        })
      }
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.page{
  width:100%;
  margin-top:$header-h;
  .user-container{
    width:100%;
    height:3.86rem;
    background: $color-a;
    border-radius: 0 0 12rem 12rem/1.8rem;
    .user-wrapper{
      width:100%;
      height:1.8rem;
      color:#fff;
      padding:0 .4rem 0 .2rem;
      box-sizing: border-box;
      @include layout-flex;
      .user-avatar{
        width:1.2rem;
        height:1.2rem;
        border-radius: 50%;
        border:2px solid #fff;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        img{
          width:100%;
          height:100%;
        }
        input{
          width:100%;
          height:100%;
          position: absolute;
          left:0;
          top:0;
          opacity:0;
        }
      }
      .user{
        width:0;
        flex:1;
        height:50%;
        margin:0 .4rem;
        @include layout-flex(column,space-around,flex-start);
        font-size:.32rem;
        .nickname{
          @include layout-flex;
          font-size:.32rem;
          height:.6rem;
          .level{
            width:.4rem;
            height:.4rem;
            font-size:.2rem;
            background-color: #eecf8b;
            border-radius: 50%;
            margin-left:.1rem;
            @include layout-flex;
          }
        }
        .points{
          font-weight: 600;
        }
      }
      .user-sign{
        font-size:.32rem;
      }
    }
    .order-menu-wrapper{
      width:100%;
      height:2.06rem;
      padding:0 .2rem;
      box-sizing: border-box;
      .order-menu{
        width:100%;
        height:100%;
        background:#fff;
        border-radius: .1rem;
        box-shadow: 0 .2rem .3rem 0 #f9d8d5;
        padding:.2rem;
        box-sizing: border-box;
        .title{
          width:100%;
          height:.4rem;
          @include layout-flex(row,space-between);
          font-size: .28rem;
          color:$color-b;
          .iconfont{
            color: $color-e;
          }
        }
        .menu-list{
          width:100%;
          height:1.2rem;
          @include layout-flex(row,space-between);
          .menu-cell{
            width:25%;
            height:100%;
            @include layout-flex(column);
            font-size:.24rem;
            color:$color-d;
            .iconfont{
              color:$color-a;
              font-size:.4rem;
              margin-bottom:.1rem;
            }
          }
        }
      }
    }
  }
}
.navigate-wrapper{
  width:100%;
  padding:0 .2rem;
  box-sizing: border-box;
  margin-top:.2rem;
  .navigate{
    width:100%;
    height:100%;
    background:#fff;
    border-radius: .1rem;
    box-shadow: 0 0 .3rem 0 #f9d8d5;
    padding:0 .2rem;
    box-sizing: border-box;
    font-size:.28rem;
    color:$color-d;
    .iconfont{
      font-size:.32rem;
    }
    .navigate-cell{
      width:100%;
      height:.9rem;
      @include layout-flex(row,space-between);
      .navigate-text{
        width:100%;
        flex:1;
        height:100%;
        margin:0 .2rem;
        @include layout-flex(row,flex-start);
      }
    }
  }
}
</style>