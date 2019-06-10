import  Vue from "vue";
import  Vuex from "vuex";
import  logger from "vuex/dist/logger.js" //引入vuex的日志插件
import  mutations from "./mutations.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    cartList:[]
  },
  getters:{
    count(state){
      //一共多少本
      //return state.cartList.reduce((prev,next)=>{return prev.count+next.count},0);
      let sum=0;
      for (let i=0; i<state.cartList.length; i++)
        sum+=state.cartList[i].count;
      return sum;
    }
  }
  ,
  mutations,
  strict:true,
  plugins:[logger()]
});
