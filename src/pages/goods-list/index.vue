<template>
<div class="page">
  <common-header :title="cname || '商品列表'" :back="backUrl"></common-header>
  <div class="sort-container border-bottom">
    <div class="sort-item" :class="{active:sortField === 'goods_id'}" @click="sortGoodsList('goods_id')">
      综合
    </div>
    <div class="sort-item" :class="{active:sortField === 'sale_num'}" @click="sortGoodsList('sale_num')">
      最热
    </div>
    <div class="sort-item" :class="{active:sortField === 'is_new'}" @click="sortGoodsList('is_new')">
      新品
    </div>
    <div class="sort-item" :class="{active:sortField === 'goods_price'}" @click="sortGoodsList('goods_price')">
      价格
      <span class="iconfont">&#xe616;</span>
    </div>
  </div>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="scrollDistance">
    <list :list="goodsList"></list>
  </div>
</div>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
import CommonHeader from '@/components/Header'
import List from './List'
export default {
  name:"GoodsList",
  directives: {infiniteScroll},
  props:{
    cid:Number,
    cname:String
  },
  components:{
    CommonHeader,
    List
  },
  data() {
    return {
      backUrl:'',
      sortField:'goods_id',
      sortType:'',
      goodsList:[],
      page:1,//为你推荐的页码
      count:8, //为你推荐每次获取的数量
      totalPage:0,//为你推荐的总页数
      busy:false,
      scrollDistance:50,
      pid:0,
      catId:0
    }
  },
  beforeRouteEnter (to, from, next) {
      next(vm => {
          vm.backUrl = from.path
      })
  },
  mounted() {
    this.catId = this.cid
  },
  methods:{
    sortGoodsList(sortField){
      this.sortField = sortField
      this.resetData()
      this.loadMore()
    },
    resetData(){
      this.goodsList = []
      this.page = 1
      this.totalPage = 0
      this.busy = false
      if(this.sortField !== 'goods_price'){
        this.sortType = ''
      }else{
        if(this.sortType === ''){
          this.sortType = 'asc'
        }else{
          this.sortType = this.sortType === 'asc' ? 'desc' : 'asc'
        }
      }
    },
    async getCidByCname(){
      if (this.cname !== '' && this.cid === 0) {
        if(this.catId >0 || this.pid > 0){
          return
        }
        console.log(this.catId)
        const res = await this.axios.get('api/category/cid',{params:{name:this.cname}})
        if (res.parent) {
          this.pid = res.cat_id
        }else{
          this.catId = res.cat_id
        }
      }
    },
    async getGoodsList(){
      this.$showLoading()
      const {goods,total} = await this.axios.get('/api/goods_list?type=1',{
          params:{
              page:this.page,
              count:this.count,
              cat_id:this.catId,//一级分类ID
              sortField:this.sortField,
              pid:this.pid,//二级分类ID
              sortType:this.sortType
          }
      });
      this.$hideLoading()
      this.goodsList = this.goodsList.concat(goods)
      if(this.page === 1){
          this.totalPage = Math.ceil(total / this.count)
      }
      this.page++
    },
    async loadMore(){
      await this.getCidByCname()
      this.busy = true
      if(this.page <= this.totalPage || this.totalPage === 0){
          await this.getGoodsList()
          this.busy = false
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.page{
  width:100%;
  margin-top:$header-h + .8rem;
  .sort-container{
    background-color: #fff;
    width:100%;
    height:.8rem;
    @include layout-flex;
    position: fixed;
    top:$header-h;
    left:0;
    z-index: 999;
    .sort-item{
      width:25%;
      height:100%;
      @include layout-flex;
      font-size:.32rem;
      color:$color-d;
      &.active{
        color:$color-a;
      }
    }
  }
}
</style>