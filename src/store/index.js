import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  setting: {
    api_url: null,
    user: null,
    default_user: null,
    prefecture: null,
  }
}

const mutations = {
  save_setting (state, { setting }) {
    state.setting = { ...setting }
    localStorage.setItem('dqw_monster_view_setting', JSON.stringify(setting))
  },
  load_setting (state) {
    const setting = JSON.parse(localStorage.getItem('dqw_monster_view_setting'))
    if (setting) {
      state.setting = Object.assign(state.setting, setting)
    }
  }
}

const actions = {
  save_setting ({ commit }, { setting }) {
    commit('save_setting', { setting })
  },
  load_setting ({ commit }) {
    commit('load_setting')
  }
}

const getters = {

}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store