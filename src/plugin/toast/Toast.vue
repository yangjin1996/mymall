<template>
  <transition name="fade">
    <div class="toast-container">
      <div class="mask" v-if="visible"></div>
      <div class="toast-txt">{{message}}</div>
    </div>
  </transition>
</template>

<script>
export default {
  data(){
    return{
      visible:false,
      message:'',
      mask:false
    }
  }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.toast-container{
    width:100%;
    height:100%;
    position: fixed;
    left:0;
    bottom: 0;
    z-index: 999;
    .mask{
      width:100%;
      height:100%;
      background-color: rgba($color: #000000, $alpha: .1);
      position: absolute;
      left:0;
      bottom: 0; 
    }
    .toast-txt{
      padding:.2rem;
      color:#fff;
      font-size:.28rem;
      text-align:center;
      background-color: rgba(85, 83, 83,.9);
      border-radius: .1rem;
      position: fixed;
      top:50%;
      left:50%;
      z-index: 999;
      transform:translate(-50%,-50%)
    }
}

.fade-enter-active,
.fade-leave-active{
  transition:opacity .5s;
}
.fade-enter,.fade-leave-to{
  opacity:0;
}
</style>