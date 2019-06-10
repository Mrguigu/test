<template>
    <div class="detail">
      <MHeader :back="true">详情页{{bid}}</MHeader>
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
          <button @click="update">确认修改</button>
        </li>
      </ul>
    </div>
</template>

<script>
    import MHeader from "../base/MHeader";
    import {findOneBook,updateBook} from "../api";
    export default {
        name: "Detail",
      components: {MHeader},
      computed:{
          bid(){
            //如果是bookid为字符串，bid赋为-1，
            if(typeof this.$route.params.bid==="string") return -1;
            else return this.$route.params.bid;
          }
        },
      methods:{
          getData(){    //通过某个id获取相应的数据
            findOneBook(this.bid).then(
              ({data})=>{
                this.book=data;
                //此步：必须为同步；如果this.book为{},那么将跳转至"/list"
                Object.keys(this.book).length == 0? this.$router.push("/list"):void(0);
              }
            ).catch(
              (err)=>{console.log(err);}
            );
          },
          async update(){
             await updateBook(this.bid,this.book);
             this.$router.push({path:"/list"});    //这也是同步的
          }

      },
      data(){
          return {book:{}}
      },
      created() {
          this.getData();
      },
      watch:{
          $route(){
            this.getData();
          }
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
  .detail{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;  /*这是四个表示：使div自动适应*/
    background: #ffffff;
    z-index: 100;
  }
</style>
