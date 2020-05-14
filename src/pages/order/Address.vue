<template>
<div class="address-container">
  <span class="iconfont position-icon">&#xe622;</span>
  <div class="address">
    <div v-if="showAddress" class="existAddress">111</div>
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
    address:Object
  },
  computed:{
    showAddress(){
      // console.log(Object.keys(this.address));
      return !!Object.keys(this.address).length
    }
  }
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
  }
  .right{
    color:$color-e;
    font-size:.32rem;
  }
}
</style>