<template>
    <div>
      <MHeader>列表页</MHeader>
      <div class="content" ref="scroll"  @scroll="loadingMore">
          <ul>
            <router-link tag="li" v-for="(book,index) in books" :key="index" :to="{name:'detail',params:{bid:book.bookId}}">
              <img v-lazy="book.bookCover" :alt="index"/>
              <div>
                <h4>{{book.bookName}}</h4>
                <p>{{book.bookInfo}}</p>
                <b>￥{{book.bookPrice}}</b> <!--可以filter-->
                <div class="btn_list">
                  <button @click.stop="remove(book.bookId)">删除</button>
                  <button @click.stop="addToCard(book)">添加</button>
                </div>
              </div>
            </router-link>
          </ul>
          <span v-text="new String('加载更多')" @click="getMore" ref="loadingMore"></span>
      </div>
    </div>
</template>

<script>
    import {pagination,removeBook} from "../api/index.js"
    import MHeader from "../base/MHeader.vue";
    import * as types from "../store/mutations-type.js";
    export default {
        name: "List",
      components: {MHeader},
      created() {
          this.getData();
        },
        methods:{
          getData(){    //获取图书数据
            if(this.hasMore&& !this.isLoading ) {   //如果还可以加载 和 不是正在加载的时候
              this.isLoading=true;  //开始加载
              pagination(this.offset).then(
                ({data}) => {   //data为一个对象：有hasMore,books属性
                  this.books = this.books.concat(data.books); //将新的数据添加到this.books中
                  this.hasMore = data.hasMore;
                  this.offset = this.books.length;
                  this.isLoading=false;   //加载完毕
                }
              ).catch(
                (err) => {
                  console.log(err)
                }
              );
            }
          },
          remove(id){     //删除莫一项
           removeBook(id).then(null).catch(
             (err)=>{ console.log(err)});
            //前端也要删
            this.books=this.books.filter((item)=>{return  item.bookId!==id});
          },
          async getMore(){
            let spanContent= this.$refs.loadingMore.innerHTML;
            spanContent="正在加载......"
            await this.getData();
          },
          loadingMore(){
            clearTimeout(this.timer);   //防抖
            this.timer=setTimeout(()=>{
              //  卷去的高度  可见的高度  总高
              let {scrollTop,clientHeight,scrollHeight}=this.$refs.scroll;
              if( scrollTop + clientHeight +20 >= scrollHeight){
                  this.getData();
              }
            },13);
          },
          addToCard(book){
            this.$store.commit(types.ADD_CART,book);
          }
        },
        data(){
          return {books:[],hasMore: true,offset:0,isLoading:false}
        }
    }
</script>

<style scoped>
  .content ul{
    padding: 10px;
  }
  .content ul li{
    display: flex;
    padding: 10px 0;
  }
  .content ul li img{
    width: 120px;
    height: 150px;
  }
  .content div{
    margin-left: 10px;
  }
  .content h4{
    line-height: 35px;
    width: 100%;
    height: 35px;
    overflow: hidden;
  }
  .content p{
    color: #2a2a2a;
    line-height: 25px;
    font-weight: lighter;
    font-size: small;
  }

  .content b{
    color: red;
    line-height: 20px;
    margin-top: 10px;
    margin-bottom: 10px;    /*为什么没用*/
  }
  .content button{
    width: 60px;
    height: 25px;
    color: #ffffff;
    background: red;
    /*display: block;*/
    border: none;
    border-radius: 15px;
    outline: none;
  }

  .content span{
    background: #cccccc;
    display: flex;
    justify-content: center;
  }
  .btn_list{
    display: flex;
    flex-direction: row;
    justify-content: space-around;  /*居中*/
  }
</style>
