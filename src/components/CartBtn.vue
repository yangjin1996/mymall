<template>
    <div class="buy iconfont" :style="style" @click="addToCart">&#xe601;</div>
</template>

<script>
import {Storage} from '@/utils/storage'
export default {
    props:{
        fontSize:{
            type:String,
            default:'.32rem'
        },
        goods:{
            type:Object,
            default(){
                return {}
            }
        },
        buyNumber:{
            type:Number,
            default:1
        }
    },
    computed:{
        style(){
            return {
              fontSize : this.fontSize
            }
        }
    },
    methods: {
        addToCart(e){
            e.stopPropagation()
            if(Object.keys(this.goods).length === 0){
                return
            }
            const goods = this.goods
            const cart = Storage.getItem('cart') || []
            const index = cart.findIndex(item => {
                return item.id === goods.id
            });
            if(index === -1){
                const  cartData = {
                    ...goods,
                    selected:true,
                    buyNumber:this.buyNumber
                }
                cart.push(cartData)
            }else{
                const buyNumber = cart[index].buyNumber
                const selected = cart[index].selected
                cart[index] = {
                    ...goods,
                    selected,
                    buyNumber:this.buyNumber + buyNumber
                }
            }
            Storage.setItem('cart',cart)
            this.$showModal({
                content:'添加购物车成功，需要结算吗？',
                btn:['是','否'],
                success:res =>{
                    if(res.confirm){
                        this.$router.push('/cart')
                    } 
                }
            })
        }
    },
}
</script>

<style lang='scss' scoped>
@import '~@/assets/scss/global';
.buy{
    width:.5rem;
    height:.5rem;
    color: $color-a;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right:.1rem;
    bottom: .1rem;
}
</style>