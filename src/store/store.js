/**
 * Created by superman on 17/2/16.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        userName: null,
        token: null,
        title: '',
        roles:null,
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            console.log('store登录了--->'+data)
            localStorage.token = data;
            state.token = data;
        },
        [types.USERNAME]: (state, data) => {
            localStorage.userName = data;
            state.userName = data;
        },
        [types.ROLES]: (state, data) => {
            localStorage.roles = data;
            state.roles = data;
        },

        [types.LOGOUT]: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem(types.USERNAME);
            localStorage.removeItem(types.ROLES);
            state.token = null
            state.userName = null
            state.roles = null
        },
        [types.TITLE]: (state, data) => {
            state.title = data;
        },
    }
})