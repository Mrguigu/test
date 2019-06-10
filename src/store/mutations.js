import * as types from "./mutations-type.js";


export  default {
    [types.ADD_CART](state,book){
      //防止改变原对象
       let newBook =new Object(book);
      //判断所添加的图书是否存在
      let product=state.cartList.find((item)=>{return  item.bookId===newBook.bookId;});
      if(product){
        product.count++;
      }else{
        newBook.count=1;     //这样不会改变原对象吗? 会的
        state.cartList.push(newBook);
      }

    }
}
