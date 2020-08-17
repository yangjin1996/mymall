<template>
<div class="page">
  <common-header title="我的消息" back="/user"></common-header>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import {Token} from "@/utils/token"
export default {
  components:{
    CommonHeader
  },
  mounted(){
    this.getNews()
  },
  methods: {
    async getNews(){
      const token = Token.getToken()
      const news = await this.axios.get('shose/notice',{
        headers:{
          token
        },
        params:{
          pages:1,
          count:8
        }
      })
      console.log(news)
    }
  },
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.page{
  width:100%;
  height:100vh;
  padding:$header-h .2rem .9rem;
  box-sizing: border-box;
  background:$color-c;
}
</style>