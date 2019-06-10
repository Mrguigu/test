import Vue from 'vue'
import Router from 'vue-router'

// import Add from "../components/Add.vue";
// import Collect from "../components/Collect.vue";
// import Detail from "../components/Detail.vue";
// import Home from "../components/Home.vue";
// import List from "../components/List.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {path:"",redirect:"/home"},
    { path:"/home",
      component:()=>import("../components/Home.vue"),
      meta:{ keepAlive: true,title:"主页" }
    },
    {path:"/add",
      component:()=>import("../components/Add.vue"),
      meta:{ title:"添加" }
    },
    {path:"/collect",
      component:()=>import("../components/Collect.vue"),
      meta:{ title:"收藏"}
    },
    {path:"/list",
      component:()=>import("../components/List.vue"),
      meta:{ title:"列表",keepAlive: true }
    },
    {path:"/detail/:bid",
      component:()=>import("../components/Detail.vue"),
      meta:{ title:"详情页" },
      name:"detail"},
    {path:"*",redirect:"/home"}
  ]
})
