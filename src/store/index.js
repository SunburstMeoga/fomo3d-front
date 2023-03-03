import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        currentAddress: 0
    },
    mutations: {
        getCurrentAddress(state, newval) {
            state.currentAddress = newval
        }
    }
})
export default store
