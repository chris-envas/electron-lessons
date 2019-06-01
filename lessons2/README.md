### 第三章

#### 拖拽文件

如何实现拖拽效果？

通过H5的拖拽API获取文件路径,再使用Node.js读取文件内容，并输出到指定区域内

- [拖拽事件API](<https://www.runoob.com/jsref/event-ondragover.html>)



```javascript
// nodejs中的fs模块
var fs=require('fs');

// 获取body
var content=document.getElementsByTagName('body')[0]

//取消H5拖拽事件默认行为 
content.ondragenter=content.ondragover=content.ondragleave=function(){
    return false; /*阻止默认行为*/
}

// 监听拖拽事件ondrop（松手）时读取文件内容，并输出到页面中
content.ondrop=function(e){
    //阻止默认行为
    e.preventDefault();     
    // 打印拖拽的文件
    console.log(e.dataTransfer.files[0]);
    var path=e.dataTransfer.files[0].path;
    fs.readFile(path,'utf-8',(err,data)=>{
        if(err){
            console.log(err);
            return false;
        }
        content.innerHTML=data;
    })
}
```



启动

```javascript
npm start
```

###  扩展

---

考虑一下如何拖拽.exe文件，后自动打开该软件。



