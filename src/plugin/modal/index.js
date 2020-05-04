import ModalCmp from './Modal'
const modal = {
    install (Vue) {
        const ModalContructor = Vue.extend(ModalCmp)
        const vm = new ModalContructor()
        vm.$mount(document.createElement('div'))
        document.body.appendChild(vm.$el)
        // Vue.prototype.$showLoading = function (mask = true) {
        //     vm.show = true
        //     vm.mask = mask
        // }
        // Vue.prototype.$hideLoading = function () {
        //     vm.show = false
        //     vm.mask = false
        // }
    }
}
export default modal