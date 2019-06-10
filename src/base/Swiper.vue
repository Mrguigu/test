<!--<template>-->
<!--  <swiper :options="swiperOption">-->
<!--    <swiper-slide v-for="(slide,key) in swiperSlides" :key="key">I'm Slide {{ slide }}</swiper-slide>-->
<!--    <div class="swiper-pagination" slot="pagination"></div>-->
<!--  </swiper>-->
<!--</template>-->

<!--<script>-->
<!--  export default {-->
<!--    name: 'carrousel',-->
<!--    data() {-->
<!--      return {-->
<!--        swiperOption: {-->
<!--          autoplay: 3500,-->
<!--          setWrapperSize :true,-->
<!--          pagination : '.swiper-pagination',-->
<!--         // paginationClickable :false,  //分页器是否可以点击-->
<!--         // mousewheelControl : false, //是否使用滑轮滚动-->
<!--          observeParents:true,    //监听父级的变化-->
<!--        },-->
<!--        swiperSlides: [1, 2, 3, 4, 5]-->
<!--      }-->
<!--    }-->
<!--  }-->
<!-- //有错：无法显示下面那排点点-->
<!--</script>-->
<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(silde,index) in swiperSlides" :key="index">
      <img :src="silde" :alt="index"/>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'carousel',
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          }
        }
      }
    },
    props:["swiperSlides"],
    created() {
      setTimeout(()=>{console.log(this.swiperSlides);},10000);
    }
  }
</script>
<style scoped>
  img{width: 100%;}
</style>
