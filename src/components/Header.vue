<template>
    <div class="head">
        <span class="iconfont" v-if="back" @click="toBack">&#xe6b3;</span>
        <p class="title">{{title}}</p>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:'QianQian左右鞋包'
        },
        back:{
            type:Boolean,
            default:false
        }
    },
    methods: {
        toBack(){

        }
    },
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.head{
    width:100%;
    height:0.9rem;
    color:#fff;
    font-size: 0.36rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-a;
    position: relative;
    span{
        font-size: 0.36rem;
        position: absolute;
        left:0.2rem;
    }
}

</style>