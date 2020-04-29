<template>
<div>
  商品列表
</div>
</template>

<script>
export default {
  props:{
    cid:[Number,String]
  },
  mounted() {
    console.log(this.$route)
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
</style>