### 第五章



 #### 渲染进程调用主进程模块（[remote](https://electronjs.org/docs/api/remote#remote)）

进程：渲染进程

`remote`模块帮助我们在渲染进程中调用主进程的模块。根据官方的说法，`remote`模块返回的对象（函数），是一个远程对象（函数），它不是简单的在渲染进程中创建一个新的对象实例，而是通知到主进程创建新的对象，随后发送到渲染进程，这种机制保证了主进程与渲染进程共用一个对象（内存），同步了进程消息。



在渲染进程调用主进程的`BrowserWindow`对象打开新的窗口加载新的页面

```javascript
//index.js
//nodejs的path模块
const path = require('path')

//获取dom
const item = document.querySelector('#openWindow')

//通过Electron的remote模块引用BrowserWindow模块
const { BrowserWindow } = require('electron').remote

//监听点击事件
item.addEventListener('click', () => {
  let win = new BrowserWindow({ width: 400, height: 400 })
  var file = path.join('file:///', __dirname, 'new.html')
  win.loadURL(file)
  win.on('closed', function() {
    win = null
  })
})
```

```javascript
// main.js
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


function createWindow(){
    //创建BrowserWindow的实例 赋值给mainWindow打开窗口   
    mainWindow=new BrowserWindow({width:800,height:600,webPreferences: {
        nodeIntegration: true
    }}); 

    mainWindow.loadURL(path.join('file:',__dirname,'index.html'));
    
    //开启渲染进程中的调试模式
    // mainWindow.webContents.openDevTools();

    console.log(path.join('file:',__dirname,'index.html'));

    mainWindow.on('closed',()=>{
        mainWindow=null;
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



#### 扩展

`remote`是怎么实现远程对象数据传递的？官方解释类似于 Java 的[RMI ](https://en.wikipedia.org/wiki/Java_remote_method_invocation)。

在[你不知道的 Electron (一)：神奇的 remote 模块](https://imweb.io/topic/5b3b72ab4d378e703a4f4435)一文中有较为清晰的讲解
