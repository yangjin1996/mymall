import LoadingCmp from './Tips'
const tips = {
    install (Vue) {
        const LoadingContructor = Vue.extend(LoadingCmp)
        const vm = new LoadingContructor()
        vm.$mount(document.createElement('div'))
        document.body.appendChild(vm.$el)
        Vue.prototype.$showTips = function (mask = true) { 
            vm.show = true
            vm.mask = mask
            setTimeout(function(){
                vm.show = false
            },2000)
        }
    }
}
export default tips