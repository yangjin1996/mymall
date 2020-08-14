<template>
<div class="wrapper">
  <div class="header">
    <span class="iconfont back" @click="$router.push('/')">&#xe6b3;</span>
    <div class="search-container"><input class="input" type="text" placeholder="大家正在搜索：秋季女装" v-model.trim="searchGoods"></div>
    <span class="search-text" @click="search(searchGoods)">搜索</span>
  </div>
  <div class="history-bar" v-show="LatelyList.length">
    <div class="search-history" v-show="!searchGoods">
      <div class="history-head">
        <p class="lately-list">最近搜索</p>
        <p class="clear" @click="deleteLatelyList">清空</p>
      </div>
    </div>
    <ul class="list-container" v-show="!searchGoods">
      <li class="search-list" v-for="(item,index) of LatelyList" :key="index">
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
      <li class="search-list" :class="{hot:true}">
        女装
      </li>
      <li class="search-list" :class="{hot:true}">
        秋季男鞋
      </li>
      <li class="search-list" :class="{hot:true}">
        个性时尚女包
      </li>
      <li class="search-list">
        男装
      </li>
      <li class="search-list">
        法师多肉
      </li>
      <li class="search-list">
        女装
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { Storage } from '@/utils/storage'
export default {
  data() {
    return {
      searchGoods:'',
      searchGoodsList:[],
      LatelyList:[]
    }
  },
  mounted(){
    this.LatelyList =  Storage.getItem('LatelyList') || [];
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
      this.LatelyList.unshift(this.searchGoods);
      Storage.setItem('LatelyList',this.LatelyList);
      this.$router.push('/search-list?q=' + item);
    },
    deleteLatelyList(){
      console.log('清空')
      sessionStorage.removeItem(shose_mall.LatelyList);
    }
  }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/scss/global';
.wrapper{
  width:100%;
  padding:.2rem;
  box-sizing: border-box;
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
      &.hot{
        background-color: rgba($color: #ff5e26, $alpha: .1);
        color:$color-a;
      }
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
</style>