### 第三章

#### 拖拽文件

如何实现拖拽效果？

通过H5的拖拽API获取文件路径,再使用Node.js读取文件内容，并输出到指定区域内

- [拖拽事件API](<https://www.runoob.com/jsref/event-ondragover.html>)



```javascript
var fs=require('fs');

var content=document.getElementsByTagName('body')[0]


content.ondragenter=content.ondragover=content.ondragleave=function(){
    return false; /*阻止默认行为*/
}


content.ondrop=function(e){

    //阻止默认行为

    e.preventDefault();     

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



###  扩展

---

考虑一下如何拖拽.exe文件，后自动打开该软件。



