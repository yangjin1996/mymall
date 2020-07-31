<template>
<div class="page">
  <common-header title="会员信息" back="/user"></common-header>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
export default {
  components:{
    CommonHeader
  }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.page{
  width:100%;
  margin-top:$header-h;
}
</style>