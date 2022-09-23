import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: [
      {
        name: 'Выгулять собаку и сходить в магазин',
        date: '17.09.2022',
        status: 'low'
      },
      {
        name: 'Покормить раба',
        date: '17.09.2022',
        status: 'medium'
      },
      {
        name: 'Покормить кента',
        date: '17.09.2022',
        status: 'high'
      },
      {
        name: 'Выгулять собаку и сходить в магазин',
        date: '18.09.2022',
        status: 'low'
      },
    ]
  },
  getters: {
    EVENTS: (state) => {
      return state.events;
    },
    EVENTS_BY_DATE: state => (date, month, year) => {
      if (date && month && year) {
        let formatted = `${date}.${month}.${year}`;
        return state.events.filter(event => event.date === formatted) || [];
      }
    }
  },
  mutations: {
    ADD_EVENT: (state, event) => {
      state.events.push(event);
    }
  },
  actions: {
    SAVE_EVENT: (context, event) => {
      context.commit('ADD_EVENT', event);
    }
  },
  modules: {
  }
})
