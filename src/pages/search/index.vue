<template>
<div class="wrapper">
  <div class="headres">
    <div class="header">
      <span class="iconfont back" @click="$router.push('/')">&#xe6b3;</span>
      <div class="search-container"><input class="input" type="text" placeholder="大家正在搜索：秋季女装" v-model.trim="searchGoods"></div>
      <span class="search-text iconfont" @click="search(searchGoods)">{{'搜索'}}</span>
    </div>
  </div>
  
  <div class="search-goods" v-show="!showSearchGoodsList">
    <div class="history-bar" v-show="LatelyList.length">
      <div class="search-history" v-show="!searchGoods && showGoods">
        <div class="history-head">
          <p class="lately-list">最近搜索</p>
          <p class="clear" @click="deleteLatelyList">清空</p>
        </div>
      </div>
      <ul class="list-container" v-show="!searchGoods && showGoods">
        <li class="search-list" v-for="(item,index) of LatelyList" :key="index" @click="search(item)">
          {{item}}
        </li>
      </ul>
      <ul class="query-list" v-show="searchGoods">
        <li class="query-goods" v-for="item of searchGoodsList" :key="item" @click="search(item)">{{item}}</li>
      </ul>
    </div>
    <div class="hot-search" v-show="!searchGoods">
      <p class="headers">热门搜索</p>
      <ul class="list-container">
        <li class="search-list" v-for="item of hotGoods" :key="item" @click="search(item)">
          {{item}}
        </li>
      </ul>
    </div>
  </div>
  <div class="search-goods-list" v-show="showSearchGoodsList">
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
</div>
</template>

<script>
import { Storage } from '@/utils/storage'
import infiniteScroll from 'vue-infinite-scroll'
import List from './List'
export default {
  directives: {infiniteScroll},
  components:{
    List
  },
  data() {
    return {
      searchGoods:'',
      showGoods:true,
      showSearchGoodsList:false,
      searchGoodsList:[],
      hotGoods:[],
      LatelyList:[],

      sortField:'goods_id',
      sortType:'',
      goodsList:[],
      cname:'',
      page:1,//为你推荐的页码
      count:8, //为你推荐每次获取的数量
      totalPage:0,//为你推荐的总页数
      busy:false,
      scrollDistance:50,
    }
  },
  mounted(){
    this.LatelyList =  JSON.parse(sessionStorage.getItem('LatelyList')) || [];
    this.cname = this.searchGoods
    this.getHotGoods();
  },
  watch:{
    searchGoods(){
      this.quickSearch()
    }
  },
  methods:{
    quickSearch(){
      this.$showLoading();
      this.axios.get('shose/search/quick',{
        params:{
          keyword:this.searchGoods
        }
      }).then(res => {
        this.searchGoodsList = res.list;
        this.$hideLoading();
      });

      // this.axios.get('shose/search',{
      //   params:{
      //     keyword:this.searchGoods
      //   }
      // })
    },
    search(item){
      this.LatelyList = JSON.parse(sessionStorage.getItem('LatelyList'));
      if(this.LatelyList){
        this.LatelyList = this.LatelyList.slice(0,19);
        const index = this.LatelyList.findIndex(i => i === item);
        if(index > -1){
          this.LatelyList.splice(index,1);
        }
      }else{
        this.LatelyList = [];
      }
      this.LatelyList.unshift(item);
      sessionStorage.setItem('LatelyList',JSON.stringify(this.LatelyList));
      this.showSearchGoodsList = true;
      this.searchGoods = item;
    },

    async getHotGoods(){
      const hotGoods = Storage.getItem('hot-goods');
      if(hotGoods){
        this.hotGoods = hotGoods;
      }else{
        this.$showLoading();
        const res = await this.axios.get('shose/search/hot');
        this.hotGoods = res.list;
        Storage.setItem('hot-goods',this.hotGoods)
        this.$hideLoading();
      }
    },
    deleteLatelyList(){
      this.showGoods = false;
      sessionStorage.removeItem('LatelyList');
    },
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
    async getGoodsList(){
      this.$showLoading()
      const {goods,total} = await this.axios.get('/api/goods_list?type=1',{
          params:{
              page:this.page,
              count:this.count,
              keyword:this.searchGoods,
              sortField:this.sortField,
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
      // await this.getCidByCname()
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
.wrapper{
  width:100%;
  box-sizing: border-box;
  .headres{
    width:100%;
    height:1rem;
    @include layout-flex;
    background-color: #fff;
    position: fixed;
    left:0;
    top:0;
    z-index: 9;
  }
  .header{
    width:100%;
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
  .search-history{
    width:100%;
    padding:0 .2rem;
    box-sizing: border-box;
    .history-head{
      width:100%;
      height:1rem;
      color:#333;
      font-size: .24rem;
      @include layout-flex($justify:space-between);
    }
  }
  .list-container{
    width:100%;
    @include layout-flex($justify:flex-start);
    flex-wrap: wrap;
    .search-list{
      height:.3rem;
      padding:.1rem;
      margin-left:.2rem;
      margin-bottom: .2rem;
      border-radius: .25rem;
      font-size: .24rem;
      color:#333;
      background-color: #eee;
      @include layout-flex;
    }
  }
  .query-list{
    width:100%;
    padding:0 .2rem;
    margin-top:.3rem;
    box-sizing: border-box;
    .query-goods{
      width:100%;
      height:1rem;
      line-height: 1rem;
      color:#333;
      font-size: .3rem;
    }
  }
  .hot-search{
    width:100%;
    .headers{
      width:100%;
      height:1rem;
      padding-left:.2rem;
      line-height: 1rem;
      font-size: .26rem;
      color:#333;
      box-sizing: border-box;
    }
  }
}
.sort-container{
  background-color: #fff;
  width:100%;
  height:.8rem;
  @include layout-flex;
  position: fixed;
  top:$header-h;
  left:0;
  z-index: 8;
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
</style>