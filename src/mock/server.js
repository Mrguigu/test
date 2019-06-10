let http =require("http");
let fs=require("fs");
let url=require("url");

console.log("entry server.js");
//  获取轮播图 /silders
//let silders=require("./silders.js");
let silders=['https://aecpm.alicdn.com/simba/img/TB14ab1KpXXXXclXFXXSutbFXXX.jpg_q50.jpg',
  "https://img.alicdn.com/simba/img/TB1_PBmbBKw3KVjSZTESuwuRpXa.jpg_q50.jpg",
  "https://aecpm.alicdn.com/simba/img/TB15tIjGVXXXXcoapXXSutbFXXX.jpg"];

//读取book.json中的数据
function readData(cb){
  //异步
  fs.readFile("./book.json","utf8",function (err,data) {
    if(err || data.length==0){  //如果有错误 或 文件没长度 就按空数组
      cb([]);
    }else{
      cb(JSON.parse(data)); //将读出的内容转换为对象
    }
  })
}

//向book.json中写入数据
function writeData(data,cb){
  fs.writeFile("./book.json",JSON.stringify(data),cb);
}

const pageSize=5;
http.createServer((req,res)=>{
  //解决请求跨域请求
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type,Content-Length,  Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By",' 3.2.1');
  if(req.method=="OPTIONS") return res.end();/*让options请求快速返回*/

    let {pathname,query}=url.parse(req.url,true); //true把query转换成对象
    if(pathname==="/silders"){
        res.setHeader("Content-Type","application/json;charset=utf8");
        res.end(JSON.stringify(silders));
    }else if(pathname==="/page"){
        let offset= parseInt(query.offset) || 0;  //获取开端的位置
        readData((books)=>{
            let backBooks= books.reverse().slice(offset,offset+pageSize);
            let hasMore=true;
            if(books.length<= offset+ pageSize){
                hasMore=false;
            }
            res.setHeader("Content-Type","application/json;charset=utf8");
            res.end(JSON.stringify({hasMore,books:backBooks}));
        });
    }else if(pathname==="/hot"){
      readData(function (books) {
        //截取books数组中倒数6本。
        let hotBooks=books.reverse().slice(0,6);
        res.setHeader("Content-Type","application/json;charset=utf8");
        res.end(JSON.stringify(hotBooks));
      });
    }else if(pathname==="/book"){ //对书的增删改查
      let id=parseInt(query.id);  //取出的字符串
      switch (req.method) {   //？id=1
          case "GET":
            if(!isNaN(id)){   //查询一个
                readData(function (books) {
                  let book= books.find((item)=>{return item.bookId===id;});
                  if(typeof book=="undefined") book={};   //如果没找到，就赋值为{}
                  res.setHeader("Content-Type","application/json;charset=utf8");
                  res.end(JSON.stringify(book));
                })
            }else{    //获取所有图书
                readData(function (books) {
                  res.setHeader("Content-Type","application/json;charset=utf8");
                  res.end(JSON.stringify(books));
                })
            }
            break;
          case "POST":
            let str="";
            req.on("data",chunk=>{
              str+=chunk;
            });
            req.on("end",()=>{
              let book= JSON.parse(str);  //将post来的数据转成对象
              readData((books)=>{
                 book.bookId= books.length ? books[books.length-1].bookId+1 : 1; //添加bookId
                 books.push(book);
                 writeData(books,()=>{
                   res.end(JSON.stringify(book));
                 });
              })
            });
            break;
          case "PUT":
            if(id){
              let str="";
              req.on("data",chunk=>{
                str+=chunk;
              });
              req.on("end",()=>{
                let book=JSON.parse(str);
                readData(function (books) {
                  books=books.map((item)=>{
                    if(item.bookId===id)  //找到id相同的那一项,并替换
                      return book;
                    return item;  //其他则原样返回
                  });
                  writeData(books,()=>{     //将数据写回book.json
                    res.end(JSON.stringify(book));
                  });
                })
              })
            }
            break;
          case "DELETE":
            readData((books)=>{
              res.setHeader("Content-Type","application/json;charset=utf8");
              books=books.filter((item)=>{return item.bookId!==id});
              writeData(books,()=>{res.end(JSON.stringify({}));}); //删除后返回空对象
            });
            break;
        }
    }else{
      res.end("entry server")
    }
  }
).listen(3000);

console.log("create server is finish！！,not close is window and not break off the command!");
console.log("server running............")
