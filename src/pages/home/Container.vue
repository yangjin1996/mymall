<template>
<div class="container">
    <div class="title">
        <span>{{title}}</span>
        <span class="iconfont more" v-if="show">更多 &#xe675;</span>
    </div>
    <slot name="content"></slot>
</div>
</template>

<script>
export default {
    props:{
        title:String,
        morePath:{
            type:String,
            default:''
        }
    },
    computed:{
        show(){
            return this.morePath.trim() != ''
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/global';
.container{
    @include container-layout;
    .title{
        width:100%;
        height:.32rem;
        @include layout-flex($justify:space-between);
        border-left:.06rem solid $color-a;
        text-indent:.2rem;
        color:$color-b;
        font-weight:600;
        font-size:.32rem;
        .more{
            color:$color-d;
            font-size:.24rem;
            font-weight:400;
        }
    }
}
</style>