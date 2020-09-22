import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: 'My Awesome App',
    user: null,
    error: null,
    loading: false,
    okalert: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setOkalert(state, payload) {
      state.okalert = payload
    }
  },
  actions: {
    userSignUp({ commit }, payload) {
      commit('setLoading', true)
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', { email: firebaseUser.user.email })
          commit('setLoading', false)
          commit('setOkalert', true)
          router.push('/home')
          commit('setError', null)
        })
        .catch(error => {
          commit('setError', '该电子邮件地址已被另一个帐户使用')
          console.log(error.message)
          commit('setLoading', false)
        })
    },
    userSignIn({ commit }, payload) {
      commit('setLoading', true)
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', { email: firebaseUser.user.email })
          commit('setLoading', false)
          commit('setError', null)
          router.push('/home')
        })
        .catch(error => {
          commit('setError', '邮箱或密码错误')
          console.log(error.message)
          commit('setLoading', false)
        })
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', { email: payload.email })
    },
    userSignOut({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
      router.push('/')
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined
    }
  }
})
