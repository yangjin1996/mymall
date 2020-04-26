<template>
<swiper :options="swiperOptions" class="swiper-container" v-if="show">
    <swiper-slide v-for="item of swiperList" :key="item">
        <img :data-src="item" class="swiper-lazy swiper-img">
        <div class="swiper-lazy-preloader"></div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
</swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
    props:{
        swiperList:Array
    },
    computed: {//用于监听swiperList改变时当前页面没有响应，用watch方法同样能解决这个问题
        show(){
            return !!this.swiperList.length
        }
    },
    // watch: {
    //     'swiperList.length'() {
    //         this.show = true;
    //     }
    // },
    components: {
        Swiper,
        SwiperSlide
    },
    data() {
        return {
          // show: false,
          swiperOptions: {
               pagination: {
                    el: '.swiper-pagination'
                },
                loop:true,
                lazy:{
                    loadPrevNext:true,
                }
           }
        }
    },
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.swiper-container{
    width:100%;
    height:3rem;
    .swiper-img{
        width:100%;
        height:100%;
    }
    /deep/.swiper-pagination-bullet-active{
        background-color: #fff;
        opacity: 1;
    }
}
</style>