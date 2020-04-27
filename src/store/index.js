import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const getUsersLink = 'https://reqres.in/api/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    total: 0,
    pagination: {
      page: 1,
      per_page: 5
    }
  },
  mutations: {
    SET_USERS(state, data) {
      state.users = data
    },
    SET_TOTAL(state, data) {
      state.total = data
    },
    SET_PAGINATION(state, data) {
      if (Object.prototype.hasOwnProperty.call(state.pagination, data.key)) {
        state.pagination[data.key] = data.value
      }
    }
  },
  actions: {
    getUsers({ state, commit }) {
      axios
        .get(getUsersLink, {
          params: {
            page: state.pagination.page,
            per_page: state.pagination.per_page
          }
        })
        .then(res => {
          if (res.data) {
            commit('SET_USERS', res.data.data)
            commit('SET_TOTAL', res.data.total)
            commit('SET_PAGINATION', { key: 'page', value: res.data.page })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {}
})
