<template>
<div class="address-container" @click="editAddress">
  <span class="iconfont position-icon">&#xe622;</span>
  <div class="address">
    <div v-if="showAddress" class="address-detail">
      <div class="name">{{address.name}}<span>{{address.phone}}</span></div>
      <div class="address-content">{{addressContent}}</div>
    </div>
    <div v-else class="empty-address">
      <span class="iconfont">+</span>添加收货地址
    </div>
  </div>
  <span class="iconfont right">&#xe62a;</span>
</div>
</template>

<script>
export default {
  props:{
    address:Object,
  },
  computed:{
    showAddress(){
      return !!Object.keys(this.address).length
    },
    addressContent(){
      if(Object.keys(this.address).length === 0) {
        return ''
      }
      return `${this.address.province}${this.address.city}${this.address.area}${this.address.address}`
    }
  },
  methods: {
    editAddress(){
      const id = parseInt(this.address.id) || 0
      const url = encodeURIComponent('/order')
      this.$router.push(`/order/address?id=${id}&url=${url}`)
    }
  },
}
</script>
<style lang='scss' scoped>

@import '~@/assets/scss/global';
.address-container{
  width:100%;
  height:1.8rem;
  margin-top:.2rem;
  background:#fff;
  border-radius: .1rem;
  padding:.2rem;
  box-sizing: border-box;
  @include layout-flex;
  .position-icon{
    color:$color-a;
    font-size:.8rem;
  }
  .address{
    width:0;
    flex:1;
    height:100%;
    .existAddress{
      width:100%;
      height:100%;
      @include layout-flex;
    }
    .empty-address{
      width:100%;
      height:100%;
      @include layout-flex;
      color:$color-e;
      font-size:.32rem;
      .iconfont{
        font-size:.5rem;
        margin-right:.1rem;
      }
    }
    .address-detail{
      width:100%;
      height:100%;
      @include layout-flex(column,$align:flex-start);
      .name{
        line-height: .6rem;
        font-size:.32rem;
        color:$color-b;
        span{
          font-size:.24rem;
          color:$color-e;
          margin-left:.2rem;
        }
      }
      .address-content{
        font-size: .24rem;
        color:$color-d;
        line-height: .35rem;
        display: -webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        overflow: hidden;
        text-overflow:ellipsis;
      }
    }
  }
  .right{
    color:$color-e;
    font-size:.32rem;
  }
}
</style>