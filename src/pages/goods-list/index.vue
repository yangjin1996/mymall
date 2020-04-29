<template>
<div>
  <common-header :title="cname || '商品列表'" :back="backUrl"></common-header>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
export default {
  props:{
    cid:Number,
    cname:String
  },
  components:{
    CommonHeader
  },
  data() {
    return {
      backUrl:'',
    }
  },
  beforeRouteEnter (to, from, next) {
      next(vm => {
          vm.backUrl = from.path
      })
  },
  mounted() {
  }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
</style>