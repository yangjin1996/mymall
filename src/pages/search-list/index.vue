<template>
<div>
  <div class="header">
    <span class="iconfont back" @click="$router.push('/')">&#xe6b3;</span>
    <div class="search-container"><input class="input" @focus="inputGoods" type="text" placeholder="大家正在搜索：秋季女装" v-model.trim="keyword"></div>
    <span class="search-text iconfont" @click="search(searchGoods)">搜索&#xe609;</span>
  </div>
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
  methods: {
    inputGoods(){
      
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.header{
  width:100%;
  margin-top:.2rem;
  height: .6rem;
  @include layout-flex($justify:space-around);
  .back{
    font-size: .36rem;
    color:#333;
  }
  .search-text{
    font-size: .28rem;
    color:#333;
  }
  .search-container{
    width:5.5rem;
    height:.6rem;
    border-radius: .3rem;
    .input{
      width:100%;
      height:100%;
      border-radius: .3rem;
      background-color: #eee;
      padding-left:.15rem;
      box-sizing: border-box;
      border:1px solid #ddd;
    }
    .input::-webkit-input-placeholder{
      font-size:.26rem;
      color:#999;
    }
  }
}
</style>