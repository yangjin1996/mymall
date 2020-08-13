<template>
<div class="loading-container" v-if="show">
    <div class="mask" v-if="mask"></div>
    <div class="text">已完成</div>
</div>
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
    @include layout-flex;
    .mask{
       width:100%;
        height:100%;
        background-color: rgba($color: #000000, $alpha: .1);
        position: absolute;
        left:0;
        bottom: 0; 
        transition: all .5s;
    }
    .text{
        width:3.5rem;
        height:1rem;
        color:#fff;
        font-size: .32rem;
        border-radius: .1rem;
        background-color: rgba($color: #000000, $alpha: .6);
        @include layout-flex;
    }
}
</style>