<template>
<div>
  {{keyword}}
</div>
</template>

<script>
export default {
  data() {
    return {
      keyword:''
    }
  },
  mounted() {
    this.keyword = this.$route.query.q;
  },
}
</script>
<style lang='scss' scoped>

@import '~@/assets/scss/global';
</style>