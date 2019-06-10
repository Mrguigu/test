<template>
  <div class="footer">
    <router-link to="/home">
      <i class="iconfont icon-zhuye"></i>
      <span>主页</span>
    </router-link>
    <router-link to="/list">
      <i class="iconfont icon-liebiao"></i>
      <span>列表</span>
    </router-link>
    <router-link to="/collect">
      <i class="iconfont icon-shoucang"></i>
      <span>收藏</span>
    </router-link>
    <router-link to="/add">
      <i class="iconfont icon-tianjia"></i>
      <span>添加</span>
    </router-link>
  </div>
</template>
<script>
  export default {
    name: "Tab"
  }
</script>

<style scoped lang="less">
/*声明使用less*/
  .footer{
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 50px; /*有点影响  */
    display:flex;
    flex-direction: row;
    border-top: 1px solid #cccccc;
    a{
      color: yellowgreen;
      display: flex;
      flex-direction: column; /* 指定了弹性容器中子元素的排列方式：纵*/
      flex: 1;  /*占比*/
      align-items: center;  /*垂直居中*/
      justify-content: center;  /*水平居中*/
    }
    a.router-link-active{
      color: red;
    }
    /* 诺：输入/home/a
    router-link-active: /home/a 和 /home 都会生效
      router-link-exact-active: /home/a 生效， /home 不生效
    */
  }
</style>
