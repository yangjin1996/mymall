<template>
<swiper :options="swiperOptions" class="swiper-container" v-if="show">
    <swiper-slide v-for="item of gallery" :key="item">
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
    gallery:Array
  },
  computed: {//用于监听swiperList改变时当前页面没有响应，用watch方法同样能解决这个问题
      show(){
          return !!this.gallery.length
      }
  },
  components: {
      Swiper,
      SwiperSlide
  },
  data() {
      return {
        // show: false,
        swiperOptions: {
              pagination: {
                  el: '.swiper-pagination',
                  type:"fraction"
              },
              loop:true,
              lazy:{
                  loadPrevNext:true,
              }
          }
      }
  },
  mounted() {
      
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.swiper-container{
    width:100%;
    height:0;
    padding-bottom:100%;
    overflow:hidden;
    .swiper-img{
        width:100%;
    }
    /deep/.swiper-pagination-fraction{
        background:rgba($color:#000,$alpha:.5);
        width:.8rem;
        height:.4rem;
        @include layout-flex;
        border-radius: .2rem;
        color:#fff;
        letter-spacing:1px;
        font-size:.24rem;
        left:85%;
    }
}
</style>