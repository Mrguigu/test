<template>
    <div>
      <MHeader>购物车</MHeader>
      <div class="content">
        <ul>
          <li v-for="(item,index) in cartList" :key="index">
            <img :src="item.bookCover" alt=""/>
            <div class="product_info">
              <h3>{{item.bookName}}</h3>
              <p>
                <button>+</button>
                X{{item.count}}
                <button>-</button>
              </p>
              <b>小计:{{item.bookPrice* item.count}}</b>
            </div>
          </li>
          <li style="float: right;">一共{{count}}</li>
        </ul>
      </div>
    </div>
</template>

<script>
    import MHeader from "../base/MHeader";
    import {mapState,mapGetters} from "vuex";
    export default {
        name: "Collect",
      components: {MHeader},
      computed:{
          ...mapState(["cartList"]),//将对象内的对象
          ...mapGetters(["count"])
      }
    }
</script>

<style scoped>
  .content>ul>li{
    display: flex;
  }
  .content ul li img{
    width: 120px;
    height: 150px;
  }
  .content button{
    width: 40px;
    height: 25px;
    color: #ffffff;
    background: red;
    /*display: block;*/
    border: none;
    border-radius: 15px;
    outline: none;
  }
  .content b{
    color: red;
    line-height: 20px;
    margin-top: 10px;
    margin-bottom: 10px;    /*为什么没用*/
  }
  .product_info{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
