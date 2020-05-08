<template>
<div>
  <detail-header :showIconMenu="showIconMenu" :opacity="headerOpacity"></detail-header>
  <div class="page" ref="page">
    <div style="height:3000px">
      <detail-gallery :gallery="gallery"></detail-gallery>
    </div>
  </div>
</div>
</template>

<script>
import BScroll from "better-scroll"
import DetailHeader from "./Header"
import DetailGallery from "./Gallery"
export default {
  props:{
    id:Number
  },
  components:{
    DetailHeader,
    DetailGallery
  },
  data(){
    return{
      showIconMenu:true,
      headerOpacity:0,
      comment:{},
      gallery:[],
      goods:{},
      scroll:null,
      scrollOptions:{
        startY:0,
        click:true,
        scrollX:false,
        scrollY:true,
        probeType:3,
        scrollbar:false
      }
    }
  },
  mounted(){
    this.getGoods()
    this.initScroll()
  },
  methods:{
    initScroll(){
      this.$nextTick(() => {
        if(!this.scroll){
          this.scroll = new BScroll(this.$refs.page,this.scrollOptions)
        }else{
          this.scroll.refresh()
        }
        this.scroll.on('scroll',position => {
          const y = Math.abs(position.y)
          const headerOpacity = y / 150
          this.headerOpacity = headerOpacity > 1 ? 1: headerOpacity
          if (y > 50) {
            this.showIconMenu = false
          }else{
            this.showIconMenu = true
          }
        })
      })
    },
    getGoods(){
      this.axios.get(`api/goods?goods_id=${this.id}`).then(result => {
        const {comment:commentList,commentTotal,gallery,goods} = result
        this.comment = {
          list:commentList,
          count:commentTotal
        }
        this.gallery = gallery
        this.goods = goods
      }).catch(err => {
        console.log(err)
        this.$router.replace('/goods-error')
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.page{
  width:100%;
  height:600px;
  background:$color-c;
  overflow: hidden;
}
</style>