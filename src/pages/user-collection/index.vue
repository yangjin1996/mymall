<template>
<div class="wrapper">
  <common-header title="我的收藏" :back="backUrl"></common-header>
  <ul class="collection-list" v-show="collectionData.length > 0">
    <li class="collection-goods" v-for="(item,index) of collectionData" :key="item.goods_id">
      <img :src="item.goods_img"/>
      <div class="goods-info">
        <p class="goods-title">{{item.goods_name}}</p>
        <span class="goods-price">￥{{item.goods_price}}</span>
      </div>
      <div class="status">
        <div class="to-goods-detail" @click="$router.push(`/goods-detail/${item.goods_id}`)">去看看</div>
        <p class="cancel" @click="cancelCollect(item.goods_id,index)">取消收藏</p>
      </div>
    </li>
  </ul>
  <div class="no-goods" v-show="collectionData.length === 0">
    <img src="../../assets/images/no-goods.png" alt="">
    <span class="text">
      您还没有收藏任何商品哦！
    </span>
  </div>
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
      backUrl:'/',
      collectionData:[],
      total:0
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backUrl = from.path
    })
  },
  mounted(){
    this.getCollection();
  },
  methods: {
    async getCollection(){
      const token = Token.getToken()
      this.$showLoading()
      const collectionData = await this.axios.get('shose/user/getCollect',{
        headers:{
          token
        }
      })
      this.collectionData = collectionData.list;
      this.total = collectionData.total;
      this.$hideLoading();
    },
    async cancelCollect(id,index){
      this.$showLoading()
      const token = Token.getToken()
      await this.axios.post('shose/collect/cancel',{goods_id:id},{
        headers:{
          token
        }
      })
      this.collectionData.splice(index,1);
      this.$hideLoading()
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.wrapper{
  width:100%;
  height:100%;
  margin-top:$header-h;
  background-color: #fff;
  .collection-list{
    width:100%;
    padding:.2rem;
    box-sizing: border-box;
    .collection-goods{
      width:100%;
      height:2.64rem;
      padding:.2rem;
      border-radius: .1rem;
      margin-bottom: .2rem;
      border:1px solid #eee;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      position: relative;
      img{
        width:2.2rem;
        height:2.2rem;
        border-radius: .1rem;
        background-color: red;
      }
      .goods-info{
        width:3.3rem;
        margin-left:.2rem;
        padding-top:.2rem;
        padding-bottom: .54rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .goods-title{
          width:100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: .28rem;
          color:#666;
        }
        .goods-price{
          font-size: .36rem;
          color:$color-a;
        }
      }
      .status{
        width:1.46rem;
        height:1.1rem;
        position: absolute;
        bottom:.2rem;
        right:.2rem;
        font-size: .24rem;
        .to-goods-detail{
          width:100%;
          height:.54rem;
          border-radius: .27rem;
          background-color: $color-a;
          @include layout-flex;
          color:#fff;
        }
        .cancel{
          width:100%;
          height:.56rem;
          @include layout-flex;
          color:#999;
        }
      }
    }
  }
  .no-goods{
    width:100%;
    height:6rem;
    margin-top:$header-h;
    font-size: .3rem;
    color:#999;
    @include layout-flex($dirction:column);
    .text{
      margin-top:.3rem
    }
  }
}
</style>