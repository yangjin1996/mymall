<template>
    <div class="search">
        <div class="internal" @click="$router.push('/search')">
            <span class="iconfont">&#xe6e7;</span>
            {{placeHolder}}
        </div>
    </div>
</template>

<script>
export default {
    props:{
        placeHolder:{
            type:String,
            default:'搜索商品名称'
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.search{
	height:$search-h;
	background-color:#ff5e46;
	padding:0 0.4rem;
	display: flex;
	justify-content: center;
    align-items: center;
    width:100%;
    position: fixed;
    top:$header-h;
    left:0;
    z-index:999;
    box-sizing:border-box;
    .internal{
        height:0.58rem;
        width:100%;
        background-color: #fff;
        border-radius: 0.29rem;
        color:#b2b2b2;
        font-size: 0.26rem;
        display: flex;
        justify-content: center;
        align-items: center;
        .iconfont{
            font-size: .26rem;
        }
        .internal span{
            font-size: 0.26rem;
        }
    }
}


</style>