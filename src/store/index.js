import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex({
	state:{
          totalPrice:0
  },
   mutations:{
          increment(state,price){
            state.totalPrice+=price
          },
            decrement(state,price){
            state.totalPrice-=price
          }
  }
  
})
