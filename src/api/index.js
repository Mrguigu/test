import axios from "axios";
//增加默认的请求路径
axios.defaults.baseURL="http://localhost:3000";

// //(拦截器)
// axios.interceptors.request.use((res)=>{
//   return res.data;
// });

/*函数作用：获取轮播图数据
  函数返回：一个promise对象
 */
export let getSilders=()=>{
  return axios.get("/silders");
};

/*函数作用：获取热门图书数据
函数返回：一个promise对象
* */
export let getHotBooks=()=>{
  return axios.get("/hot");
};

/*函数作用：获取所有图书数据
函数返回：同上
* */
export let getAllBooks=()=>{
  return axios.get("/book");
};

/*函数作用：获取所有图书数据
函数返回：同上
* */
export  let removeBook=(id)=>{
  return axios.delete("/book?id="+ id);   //此函数没见过
}

/*函数作用：获取相应id的图书
函数返回：同上
* */

export  let findOneBook=(id)=>{
  return axios.get("/book?id="+ id);
}

/**
 * 函数作用：修改图书的数据
 * @param id
 * @param data：新的数据
 * @returns {Promise<AxiosResponse<T>>}
 */
export let updateBook=(id,data)=>{
  return axios.put("/book?id="+ id,data);
}

/**
 * 函数作用：添加一个图书数据
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
export let addBook=(data)=>{
  return axios.post("/book",data);
};

/***
 * 函数作用：同时发送两个请求（获取轮播图和热门图书的数据）
 * @returns {Promise<AxiosResponse<T>[]>}
 */
export let getAll=()=>{
  return axios.all([getSilders(),getHotBooks()]);
};

/***
 * 函数作用：分页；每次请求一页的数据
 * @param offset：开端的位置
 * @returns {Promise<AxiosResponse<T>>}
 */
export let pagination =(offset)=>{
  return axios.get("/page?offset="+offset);
}
