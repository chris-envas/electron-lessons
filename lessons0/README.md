### 第一章



> 如果你是第一次接触Electron，你应该先去[官网](https://electronjs.org/)了解看看，通过官方提供的一个快速启动程序，立即看看Electron是如何运转的

```javascript
# 克隆示例项目的仓库
$ git clone https://github.com/electron/electron-quick-start

# 进入这个仓库
$ cd electron-quick-start

# 安装依赖并运行
$ npm install && npm start
```

如果你对Electron有所了解，请直接使用[electron-vue](https://github.com/SimulatedGREG/electron-vue)进行快速开发



#### 开始

现在，让我们一起从头到尾构建并了解Electron

```powershell
# 创建目录
$ mkdir electron-test

# 进入
$ cd electron-test

# 创建UI界面文
$ touch index.html

# 创建主进程文件
$ touch main.js

# 创建package.json
$ npm init 

# 安装依赖
$ npm i electron --save
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>test</title>
</head>
<body>
    hello world
</body>
</html>
```

```javascript
//main.js
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
  
    mainWindow.loadFile(path.join('index.html'));
    //开启渲染进程中的调试模式
    mainWindow.webContents.openDevTools();

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

```javascript
//package.json
{
...
  //新增npm指令
  "scripts": {
    +"start": "electron ."
  },
 ...
}

```

启动

```powershell
npm start
```

结果

![start](https://s2.ax1x.com/2019/05/03/EUjPv4.png)

> 以上代码，我们调用了两个Electron的API，分别时app、BrowserWindow
>
> 前者是负责控制应用的[生命周期](https://electronjs.org/docs/api/app),后者负责[创建和控制浏览器窗口](<https://electronjs.org/docs/api/browser-window>)

简单几行代码，我们就创建出一个electron应用，虽然它很简陋，接下来让我们一起探索它！









