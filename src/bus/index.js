import BusVue from 'vue'

export default {
    install(Vue){
        Vue.prototype.$bus = new BusVue();
    }
}