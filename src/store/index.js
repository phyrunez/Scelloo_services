import Vue from "vue";
import Vuex from "vuex";
import data from '../data/data'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: data,
    paidTotalAmount: [],
    paidTotalAmountResult: ""
  },
  getters: {
    paidTotalAmountResult(state) {
      return state.paidTotalAmountResult
  },
  },
  mutations: {
    getPaidTotalAmount(state) {
      const dataState = state.data
      console.log(dataState)
      dataState.map(item => {
        if(item.paymentStatus.status_tag === 'Paid') {
          state.paidTotalAmount.push(+item.amount)
          console.log(state.paidTotalAmount)
          function calculateSum(array) {
            return array.reduce((accumulator, value) => {
              return accumulator + value;
            }, 0);
          }
          let res = calculateSum(state.paidTotalAmount)
          console.log(res)
          state.paidTotalAmountResult = res
          console.log(state.paidTotalAmountResult)
        }
      })
      
    }
  },
  actions: {
    async getPaidTotalAmount(context) {
      context.commit('getPaidTotalAmount')
    }
  },
  modules: {},
});
