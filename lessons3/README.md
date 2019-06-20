### 第四章

#### 系统快捷键（[globalShortcut](https://electronjs.org/docs/api/global-shortcut#%E7%B3%BB%E7%BB%9F%E5%BF%AB%E6%8D%B7%E9%94%AE)）

进程：主进程

`globalShortcut` 模块可以在操作系统中注册/注销全局快捷键, 以便可以为操作定制各种快捷键。但只能在**主进程**中使用

`globalShortcut`主要接收两个参数，分别为注册的快捷键和回调函数

```javascript
//main.js
//引入electron模块
var electron =require('electron');

//nodejs中的path模块
var path=require('path');

//创建electron引用     控制应用生命周期的模块
var app=electron.app;     

//创建electron BrowserWindow的引用          窗口相关的模块
var BrowserWindow=electron.BrowserWindow;

// 调用全局快捷键注册模块
var globalShortcut = electron.globalShortcut

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

    const ret = globalShortcut.register('CommandOrControl+X', () => {
        console.log('CommandOrControl+X is pressed')
    })
    if (!ret) {
        console.log('registration failed')
    }
    // 检查快捷键是否注册成功
    console.log(globalShortcut.isRegistered('CommandOrControl+X'))
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



#### 复制粘贴板（[clipboard](https://electronjs.org/docs/api/clipboard#%E5%89%AA%E8%B4%B4%E6%9D%BF)）

进程：主进程，渲染进程

以下是完整实例

```html
//index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>electron</title>
    <style>
    
    </style>
</head>
<body>
    <div>
        <span id="paste">粘贴</span>
        <input id='copyInput' type="text" placeholder='已复制! 请在这里执行粘贴'>
    </div>
    <script src="render/index.js"></script>
</body>
</html>
```

```javascript
//index.js
//创建Electron并引用复制模块
const { clipboard } = require('electron')

//提前复制好一段文本
clipboard.writeText('Example String')

let copyInput = document.querySelector('#copyInput')
let paste = document.querySelector('#paste')

//监听事件 并将复制内容输出到对应的DOM元素中
paste.addEventListener('click', function() {
    if (copyInput.value !== '') copyInput.value = ''
    copyInput.value = clipboard.readText()
})
```

启动

```shell
npm start
```

![启动](https://s2.ax1x.com/2019/05/27/VZlTY9.png)

点击粘贴即可获取复制的内容

`clipboard`提供了不止复制粘贴文本的方法，还包括html、图片等许多方法
[传送门](https://electronjs.org/docs/api/clipboard)
