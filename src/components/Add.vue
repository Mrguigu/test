<template>
    <div>
      <MHeader>添加</MHeader>
      <ul>
        <li>
          <label>图书名称</label>
          <input type="text" v-model="book.bookName"/>
        </li>
        <li>
          <label>图书信息</label>
          <input type="text" v-model="book.bookInfo"/>
        </li>
        <li>
          <label>图书价格</label>
          <input type="text" v-model.number="book.bookPrice"/>
        </li>
        <li>
          <label>图书封面</label>
          <input type="text" v-model="book.bookCover"/>
        </li>
        <li>
          <button @click="add">添加</button>
        </li>
      </ul>
    </div>
</template>

<script>
    import MHeader from "../base/MHeader";
    import {addBook} from "../api/index.js";
    export default {
        name: "Add",
        components: {MHeader},
        methods:{
          async add(){
            // if(Object.keys(this.book).length<4)
            //   console.log("shao le"); //可以同 VUE.directive自定义组件
            await addBook(this.book);
            this.$router.push("/list");
          }
        },
        data(){
          return {book:{}};
        }
    }
</script>

<style scoped lang="less">
  ul{
    margin-top: 30px;
    padding: 10px;
  li{
    margin-bottom: 10px;
  }
  label{
    display: block;
    font-weight: bold;
  }
  input{
    width: 100%;
    line-height: 25px;
    border: none;
    border-bottom: 2px solid #cccccc;
  }
  button{
    width: 100px;
    height: 35px;
    color: #ffffff;
    background: cornflowerblue;
    display: block;
    border: none;
    border-radius: 5px;
    outline: none;
  }
  }
</style>
