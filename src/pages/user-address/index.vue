<template>
<div class="page">
  <common-header title="我的地址" :back="backUrl"></common-header>
  <ul class="address-list">
    <li class="address-msg"  v-for="item of address" :key="item.id">
      <div class="address">
        <div class="name">
          <span>{{item.name}}</span>
          <span>{{item.phone}}</span>
        </div>
        <div class="detail">
          {{item.province}}   {{item.city}}   {{item.area}}   {{item.addresss}}
        </div>
      </div>
      <div class="operation">
        <div class="default">
          <div class="bar" @click="setDefaultAddress(item.id,item.is_default)"><span class="iconfont" v-show="item.is_default === 1">&#xe62e;</span></div>
           默认地址
        </div>
        <div class="delete"><span class="iconfont" @click="$router.push('/user/add-address?url=' + item.id)">&#xe888; 编辑</span><span class="iconfont del" @click="deleteAddress(item.id)">&#xe632; 删除</span></div>
      </div>
    </li>
  </ul>
  <div class="add-address" v-if="showAddAddress" @click="$router.push(`/user/add-address?url=${backUrl}`)">添加新地址</div>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import {Token} from '@/utils/token'
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
      backUrl:'/user',
      addressId:0,
      address:[],
      showAddAddress:true
    }
  },
  mounted() {
    this.$showLoading();
    this.getUserAddress();
    this.$hideLoading();
  },
  methods: {
    async getUserAddress(){
      const USER_TOKEN =Token.getToken();
      this.$showLoading();
      this.address = await this.axios.get('shose/address',{
          headers:{
              token:USER_TOKEN
          }
      }).then(res => res.address)
      this.showAddAddress = (MAX_ADDRESS_NUM - this.address.length) > 0;
      this.$hideLoading();
    },
    setDefaultAddress(Id,isDefault){
      if(isDefault === 1){
        return
      }
      const USER_TOKEN =Token.getToken()
      this.$showLoading()
      this.axios.post('shose/address/default',
        {
          id:Id,
          is_default:1
        },
        {
        headers:{
          token:USER_TOKEN
        }
      }).then(() => {
        const index = this.address.findIndex(i => i.id === Id)
        this.address.forEach(res => {
          res.is_default = 0
        })
        this.address[index].is_default = 1
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.$hideLoading()
        this.$showToast({
          message:'设置成功',
          mask:false
        })
      })
    },
    deleteAddress(Id){
      this.$showModal({
        content:'确定要删除吗？',
        success:res => {
          if(res.confirm){
            const USER_TOKEN =Token.getToken();
            this.$showLoading()
            this.axios.post('shose/address/delete',{id:Id},{
              headers:{
                token:USER_TOKEN
              }
            }).then(() => {
              const index = this.address.findIndex(i => i.id === Id);
              this.address.splice(index,1);
              this.$showToast({
                message:'删除成功',
                mask:false
              })
            }).finally(() => {
              this.$hideLoading()
            })
          }
        }
      })
    }
  },
}
</script>
<style lang='scss' scoped>

@import '~@/assets/scss/global';
.page{
  width:100%;
  height:100%;
  padding-top: .9rem;
  box-sizing: border-box;
  background:#fff;
  .address-list{
    width:100%;
    padding-bottom: .01rem;
    background-color: #eee;
    transition: height 1s;
    .address-msg{
      width:100%;
      height:2.16rem;
      margin-bottom: .2rem;
      box-sizing: border-box;
      background-color: #fff;
      .address{
        height:1.4rem;
        padding:.2rem .4rem;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .name{
          width:100%;
          @include layout-flex($justify:space-between);
          span{
            font-size: .28rem;
            color:#666;
          }
        }
        .detail{
          width:100%;
          line-height: .32rem;
          @include layout-flex($justify:flex-start);
          font-size: .24rem;
          color:#666;
        }
      }
      .operation{
        width:100%;
        height:.76rem;
        padding:.2rem .4rem;
        font-size: .24rem;
        color:#666;
        box-sizing: border-box;
        @include layout-flex($justify:space-between);
        .default{
          width:1.36rem;
          color:$color-a;
          @include layout-flex($justify:space-between);
          .bar{
            width:.25rem;
            height:.25rem;
            border-radius: 50%;
            border:1px solid $color-a;
            span{
              font-size: .26rem;
              color:$color-a;
            }
          }
        }
        .delete{
          span{
            font-size: .26rem;
          }
          .del{
            margin-left:.3rem;
          }
        }
      }
    }
  }
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
}
</style>