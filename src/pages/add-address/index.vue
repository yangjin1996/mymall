<template>
<div class="page">
  <common-header title="编辑地址" :back="backUrl"></common-header>
  <div class="add-address">
    <div class="row border-bottom">
      <label class="title">收货人</label>
      <input type="text" placeholder="姓名" class="input" v-model="name">
    </div>
    <div class="row border-bottom">
      <label class="title">联系电话</label>
      <input type="text" placeholder="手机" class="input" v-model="phone">
    </div>
    <div class="row border-bottom">
      <label class="title">选择地区</label>
      <div class="input regin-input" @click="showChooseAddress=true">
        {{regionText}}
        <span class="iconfont">&#xe62a;</span>
      </div>
    </div>
    <div class="row border-bottom">
      <label class="title">详细地址</label>
      <textarea placeholder="街道门牌信息" class="textarea" v-model="address"></textarea>
    </div>
    <div class="row border-bottom">
      <label class="title">设置为默认地址</label>
      <div class="switch-container">
        <input type="checkbox" id="user-swidth" v-model="isDefault">
        <label for="user-swidth"></label>
      </div>
    </div>
    <div class="login-btn">
      <div class="submit" @click="saveAddress">提交</div>
    </div>
  </div>
  <div class="choose-region" v-if="showChooseAddress">
    <div class="mask" @click="showChooseAddress=false"></div>
    <v-distpicker type="mobile" @selected="selectAddress"></v-distpicker>
  </div>
</div>
</template>

<script>
import VDistpicker from 'v-distpicker'
import CommonHeader from '@/components/Header'
import addressValidator from '@/validate/address'
import {validate} from '@/utils/function'
import {Token} from '@/utils/token'
import {Storage} from '@/utils/storage'
export default {
  components:{
    CommonHeader,
    VDistpicker
  },
  beforeRouteEnter (to, from, next) {
      next(vm => {
          vm.backUrl = from.path
      })
  },
  data() {
    return {
      backUrl:'',
      showChooseAddress:false,
      region:[],
      name:'',
      phone:'',
      address:'',
      isDefault:false,
      addressId:0
    }
  },
  mounted() {
    this.getAddress ();

  },
  computed:{
    regionText(){
      if(this.region.length === 0){
        return '地区信息'
      }else{
        return this.region.join(' ')
      }
    }
  },
  methods: {
    async getAddress () {
      const USER_TOKEN =Token.getToken();
      const addressId = parseInt(this.$route.query.url);
      this.addressId = addressId;
      if(addressId > 0){
        this.$showLoading();
        let add = await this.axios.get('shose/address',{
          params:{
            id:addressId
          },
          headers:{
            token:USER_TOKEN
          }
        })
        add = add.address;
        this.$hideLoading();
        this.name = add.name;
        this.phone = add.phone;
        this.address = add.address;
        this.region = [add.province,add.city,add.area],
        this.isDefault = add.is_default === 1
      }
    },
    saveAddress(){
      const data = {
        name:this.name,
        phone:this.phone,
        province:this.region[0] || '',
        city:this.region[1] || '',
        area:this.region[2] || '',
        address:this.address,
        is_default:this.isDefault ? 1 : 0
      }
      const res = validate(data,addressValidator)
      if(res.error !== 0){
        this.$showToast({
          message:res.message
        })
        return
      }
      this.$showLoading()
      const USER_TOKEN =Token.getToken();
      let url;
      if(this.addressId > 0){
        url = 'shose/address/update';
        data.id = this.addressId;
      }else{
        url = 'shose/address/add';
      }
      this.axios.post(url,data,{
        headers:{
          token:USER_TOKEN
        }
      }).then((res) => {
        if(this.addressId > 0){
          this.$router.replace(this.backUrl)
        }else{
          data.id = res.address_id
          Storage.setItem('address',data)
          this.$router.replace(this.backUrl)
          this.$showToast({
            message:'添加成功',
            mask:false
          })
        }
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.$hideLoading()
      })
    },
    selectAddress(data){
      this.newreagin = '';
      this.region = [
        data.province.value,
        data.city.value,
        data.area.value
      ]
      this.showChooseAddress = false
    }
  },
}
</script>
<style lang='scss' scoped>

@import '~@/assets/scss/global';
.page{
  width:100%;
  height:100%;
  padding:$header-h 0 .9rem;
  box-sizing: border-box;
  background:#fff;
  .add-address{
    width:100%;
    .row{
      width:100%;
      height: .9rem;
      padding:.2rem;
      @include layout-flex;
      font-size: .3.2rem;
      box-sizing: border-box;
      .title{
        width:0;
        flex:1;
        color:$color-b;
      }
      .input{
        width:5.2rem;
        line-height: .4rem;
        font-size:.28rem;
      }
      .textarea{
        width:5.2rem;
        font-size:.28rem;
        line-height: .4rem;
        resize:none;
      }
      .regin-input{
        @include layout-flex($justify:space-between);
        color:$color-e;
      }
    }
  }
  .login-btn{
    width:100%;
    height:1rem;
    margin-top:.4rem;
    padding:0 .2rem;
    box-sizing: border-box;
    .submit{
      width:100%;
      height:100%;
      background:$color-a;
      @include layout-flex;
      color:#fff;
      font-size:.32rem;
      border-radius: .1rem;
    }
  }
  .choose-region{
    width:100%;
    height:100%;
    position: fixed;
    top:0;
    left:0;
    .mask{
      width:100%;
      height:100%;
      position: absolute;
      top:0;
      left:0;
      background: rgba($color: #000000, $alpha: .3);
    }
    .distpicker-address-wrapper{
      width:100%;
      height:50%;
      position: absolute;
      left:0;
      top:50%;
      background: #fff;
    }
    /deep/ .address-header{
      background: #ff5e46;
      color:#fff;
      width:100%;
      position: fixed;
      bottom:50%;
      height: 0.5rem;
      font-size:.28rem;
    }
    /deep/ .address-header ul li {
      flex-grow:1;
      text-align:center;
    }
    /deep/ .address-header .active {
      color:#fff;
      border-bottom:0.05rme solid #ff5e46;
    }
    /deep/ .address-container{
      overflow: auto;
      height:100%;
      padding-top:.2rem;
    }
    /deep/ .address-container .active{
      color:#ff5e46;
    }
  }
}
.switch-container{
  height: .5rem;
  width: 1rem;
  display: inline-block;
  overflow: hidden;
}
.switch-container input{
  display: none
}
.switch-container label{
  display: block;
  width: 100%;
  height: 100%;
  background-color:rgba(0,0,0,.25);
  cursor: pointer;
  border-radius: .5rem;
  transition: all .4s ease;
}
.switch-container label:before{
  content:'';
  display: block;
  border-radius: .5rem;
  height: .42rem;
  width: .42rem;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
  transition: all .4s ease;
  background-color: #fff;
  position: relative;
  right: -2px;
  top: 2px;
}

.switch-container input:checked~label:before{
  right: -.5rem;
  background-color: #fff;
}

.switch-container input:checked~label{
  background-color: $color-a;
}
</style>