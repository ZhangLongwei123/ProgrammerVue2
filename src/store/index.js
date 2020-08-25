import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export  default  new Vuex.Store({
  state:{ // 属性定义
    items2 : []
  },
  mutations:{// 类似于java中的setter方法来控制访问
    setItems2(state,data){
      state.items2 = data;
    }
  },getter: {

  }

})
