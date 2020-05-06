<template>
<div class="footer-container border-top">
    <router-link tag="div" to="/"  class="footer-nav">
        <span class="iconfont">&#xe609;</span>
        <span>首页</span>
    </router-link>
    <router-link tag="div" to="/category" class="footer-nav">
        <span class="iconfont">&#xe667;</span>
        <span>分类</span>
    </router-link>
    <router-link tag="div" to="/cart" class="footer-nav">
        <span class="iconfont">&#xe60c;</span>
        <span>购物车</span>
    </router-link>
    <div class="footer-nav">
        <span class="iconfont">&#xe605;</span>
        <span>我的</span>
    </div>
</div>
</template>

<script>
export default {

}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.footer-container{
    width:100%;
    height:$footer-h;
    background-color: #fff;
    position: fixed;
    left:0;
    bottom:0;
    z-index:100;
    @include layout-flex;
    .footer-nav{
        width:25%;
        height:100%;
        color:$color-d;
        font-size:.2rem;
        @include layout-flex(column);
        .iconfont{
            font-size: .4rem;
            margin-bottom: .1rem;
        }
        &.router-link-exact-active{
            color:$color-a;
        }
    }
}
</style>