<template>
<!-- <transition name="fade"> -->
<div class="loading-container" v-if="show">
    <div class="mask" v-if="mask"></div>
    <img src="/images/loading-svg/loading-spinning-bubbles.svg" class="loading-img">
</div>
<!-- <transition> -->
</template>

<script>
export default {
    data() {
        return {
            show:false,
            mask:false
        }
    },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.loading-container{
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
    .loading-img{
        width:25%;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
}
// .fade-enter-active,
// .fade-leave-active{
//     transition:opacity .5s;
// }
// .fade-enter,.fade-leave-to{
//     opacity:0;
// }
</style>