<template>
    <div>
      <MHeader>首页</MHeader>
      <div class="content">
        <Loading v-if="loading"></Loading>
        <template v-else>
        <Swiper :swiperSlides="silders"></Swiper>
        <h3>热门图书</h3>
        <div class="hotbooks_container">
          <ul>
            <li v-for="(book,index) in hotBooks">
              <img :src="book.bookCover" :alt="index"/>
              <b>{{book.bookName}}</b>
            </li>
          </ul>
        </div>
        </template>
      </div>
    </div>
</template>

<script>
  //1.引入组件 2.注册组件 3.使用组件
    import MHeader from "../base/MHeader.vue";
    import Swiper from "../base/Swiper.vue";
    import {getAll} from "../api/index.js";
    import Loading from "../base/Loading.vue";

  export default {
        name: "Home",
        components: {MHeader,Swiper,Loading},
        created() {
          // this.getSilders();
          // this.getHotBooks();
          setTimeout(()=>{ this.getData();},1000 );
        },
        data(){
          return {silders:[],hotBooks:[],loading:true}       //存储轮播图数据
        },
        methods:{
          // async getSilders(){
          //   // getSilders().then(
          //   //   ({data})=>{console.log(this);
          //   //               this.silders=data;
          //   //               console.log(data)}
          //   //   ).catch((error)=>{console.log(error)});
          //   // getSilders().then(function (response) {
          //   //   let {data}= response;   //获取轮播图数据
          //   //   console.log(curThis);
          //   //   console.log(data);
          //   //   curThis.silders=data;
          //   // }).catch(function (error) {
          //   //     console.log(error);
          //   //   });
          //   let {data}=await getSilders();
          //   this.silders=data;
          // },
          // getHotBooks(){
          //   getHotBooks().then(
          //     ({data})=>{this.hotBooks=data;}
          //     ).catch((error)=>{console.log(error)});
          // }
          async getData(){
            let [silders,hotBooks]=await getAll();
            this.silders=silders.data;
            this.hotBooks=hotBooks.data;
            this.loading=false;
          }
        }
    }
</script>

<style scoped lang="less">
  h3{
    color: #cccccc;
    background: cadetblue;
    padding-left: 10px;
  }
  div.hotbooks_container{
    width: 90%;
    margin: 0 auto;
    ul{
      display: flex;
      flex-wrap: wrap;/*默认为wrap:换行*/
      padding-bottom: 10px;
      li{
        text-align: center;
        width: 50%;
        margin: 5px 0px;
        img{width: 100%;}
      }
    }
  }
</style>
