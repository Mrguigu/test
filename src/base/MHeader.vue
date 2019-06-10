<template>
    <div class="header">
      <slot></slot>
      <i class="iconfont icon-fanhui-" v-if="back" @click="goBack"></i>
    </div>
</template>

<script>
    export default {
        name: "MHeader",
        props:{
          back:{
            type:Boolean,
            default:false
          }
        },
        methods:{
          goBack(){
            this.$router.go(-1);
          }
        }

    }
</script>

<style scoped lang="less">
  /*这里是先全部居中，在absolute移动<i>
    我：float：<i>  居中：文本
  */
  div.header{
      position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: cadetblue;
    text-align: center;
    font-weight: bold;
    i{
      position: absolute;
      left: 10px;
    }
  }
</style>
