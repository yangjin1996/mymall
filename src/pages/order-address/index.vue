<template>
<div class="wrapper">
  <div class="page">
    <common-header title="选择地址" :back="backUrl"></common-header>
    <div class="address-list">
      <div class="address-item border-bottom" :class="{selected:item.is_default}" v-for="item of address" :key="item.id" @click="chooseAddress(item)">
        <div class="address-content">
          <div class="address-name">
            <span>收货人:{{item.name}}</span>
            <span>{{item.phone}}</span>
          </div>
          <div class="address-detail">
            收货地址:{{item.detail}}
          </div>
        </div>
        <span class="iconfont">√</span>
      </div>
    </div>
    <div class="add-address" v-if="showAddAddress" @click="$router.push(`/user/add-address?url=${backUrl}`)">添加新地址</div>
  </div>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import {Token} from '@/utils/token'
import {Storage} from '@/utils/storage'
const USER_TOKEN =Token.getToken()
const MAX_ADDRESS_NUM = 10
export default {
  components:{
    CommonHeader
  },
  beforeRouteEnter (to, from, next) {
      next(vm => {
          vm.backUrl = to.query.url || from.path
          vm.addressId = parseInt(to.query.id)
      })
  },
  data() {
      return {
          backUrl:'',
          addressId:0,
          address:[],
          showAddAddress:true
      }
  },
  mounted() {
      this.getUserAddress()
  },
  methods: {
    chooseAddress(items){
      const index = this.address.findIndex(i => i.id === items.id)
      this.address.forEach(res => {
        res.is_default = 0
      })
      this.address[index].is_default = 1
      items.is_default = true
      if(index > -1){
        Storage.setItem('address',this.address[index])
        this.$router.push('/order')
      }
    },
    async getUserAddress(){
      this.$showLoading()
        this.address = await this.axios.get('shose/address',{
            headers:{
                token:USER_TOKEN
            }
        }).then(res => res.address.map(item => {
          item.detail = `${item.province}${item.city}${item.area}${item.address}`
          item.selected = item.id === this.addressId
          this.$hideLoading()
          return item
        }))
        this.showAddAddress = (MAX_ADDRESS_NUM - this.address.length) > 0
    }
  },
}
</script>
<style lang='scss' scoped>

@import '~@/assets/scss/global';
.wrapper{
  width:100vw;
  height:100vh;
  background-color: #eee;
}
.page{
  width:100%;
  height:100%;
  padding-top: .9rem;
  box-sizing: border-box;
  background:$color-c;
  .add-address{
      width:100%;
      height:.9rem;
      background:$color-a;
      color:#fff;
      font-size:.36rem;
      @include layout-flex;
      position: fixed;
      left:0;
      bottom:0;
  }
  .address-list{
    width:100%;
    margin-top:.2rem;
    .address-item{
      width:100%;
      height:1.48rem;
      background:#fff;
      padding:.4rem .32rem;
      box-sizing: border-box;
      @include layout-flex;
      .address-content{
        width:0;
        height:100%;
        flex:1;
        margin-right:.2rem;
        .address-name{
          @include layout-flex($justify:space-between);
          height:.42rem;
          font-size: .32rem;
        }
        .address-detail{
          font-size:.24rem;
          margin-top:.1rem;
        }
      }
      .iconfont{
        color:#fff;
        font-size:.4rem;
        @include layout-flex;
        width:.5rem;
        height:100%;
      }
      &.selected{
        background:#ff7c76;
        .address-content{
          color:#fff;
        }
      }
    }
  }
}
</style>