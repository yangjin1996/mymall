<template>
<div>
    <common-header title="分类" :back="true"></common-header>
    <search-bar></search-bar>
    <common-footer ref="footer"></common-footer>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import CommonFooter from '@/components/Footer'
export default {
    components:{
        CommonHeader,
        SearchBar,
        CommonFooter
    }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
</style>