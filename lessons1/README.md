### 第二章

#### 主进程与渲染进程

我们需要先明白，主进程和渲染进程是什么？



**主进程**

Electron使用前端技术作为APP的GUI,可以把它当做一个小型的Chrome内核浏览器，在`package.json`文件中的`main`键值就是主进程文件，主进程只有一个！

**渲染进程**

依赖于chrome内核的多进程架构，我们可以在Electron的每个页面使用自己的线程，这些线程称为渲染进程

与在普通浏览器不同的是，在每个页面中，我们可以使用Node.js的API，可以在一定程度上与操作系统进行交互



根据上面的说法，我们马上尝试一下两个练习

- 打开APP的时候启动两个窗口

- 利用nodejs获取`package.json`的内容

1、准备两个页面

```html
//index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>test</title>
</head>
<body>
    <div class="main">
        hello world peter
    </div>
    <script src="render/index.js"></script>
</body>
</html>
```

```html
//new.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>新页面</title>
</head>
<body>
    <div class="main">
        hello world envas
    </div>
</body>
</html>
```
2、主进程配置窗口的参数，加载页面

```javascript
//主进程

//引入electron模块
var electron =require('electron');

//nodejs中的path模块
var path=require('path');

//创建electron引用     控制应用生命周期的模块
var app=electron.app;     

//创建electron BrowserWindow的引用          窗口相关的模块
var BrowserWindow=electron.BrowserWindow;

//变量 保存对应用窗口的引用

var mainWindow=null;
var newWindow=null;


function createWindow(){
    //创建BrowserWindow的实例 赋值给mainWindow打开窗口   
    mainWindow=new BrowserWindow({width:800,height:600,webPreferences: {
        nodeIntegration: true
    }}); 
    //创建BrowserWindow的实例 赋值给newWindow打开窗口 
    newWindow=new BrowserWindow({width:200,height:200,webPreferences: {
        nodeIntegration: false
    }}); 
    mainWindow.loadFile(path.join('index.html'));
    newWindow.loadFile(path.join('new.html'));

    //开启渲染进程中的调试模式
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed',()=>{
        mainWindow=null;
    })    
    newWindow.on('closed',()=>{
        newWindow=null
    })
}

app.on('ready',createWindow)


// 当所有的窗口被关闭后退出应用   Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q

    // 对于OS X系统，应用和相应的菜单栏会一直激活直到用户通过Cmd + Q显式退出
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  
//macos
app.on('activate', () => {
// 对于OS X系统，当dock图标被点击后会重新创建一个app窗口，并且不会有其他
    if (mainWindow === null) {
        createWindow();
    }
});
```

3、利用`fs`模块读取文件信息，并输出到页面中

```javascript
//index.js
// nodejs中的fs模块
let fs = require('fs')

// 读取package.json的内容并输出到页面中
fs.readFile('package.json',(err,data) => {
  if(!err){
    var main = document.querySelector('.main')
    main.innerHTML = main.innerHTML + data
  }
})
```


**启动**

```powershell
npm start
```

![示例](https://s2.ax1x.com/2019/05/06/EDhKhD.png)



