### 第七章

#### 渲染进程与渲染进程的通信（[webContents](https://electronjs.org/docs/api/web-contents)）

> 渲染以及控制 web 页面

进程：主进程

在[主进程与渲染进程](https://github.com/luojinxu520/electron-lessons/tree/master/lessons1)一文中，我提到**依赖于chrome内核的多进程架构，我们可以在Electron的每个页面使用自己的线程**，于是我们可能出现这样一种需求

我们需要在多个页面中进行通信，从前端的角度来讲，我们可以使用`localStorage`，来保存会话。

但是本文将以`Electron`的方式来解决这个问题



1、首先我们会在渲染进程中利用`ipcRenderer`发送消息到主进程中

```javascript
//openWindow.js

// 渲染进程下的通信模块
const { ipcRenderer } = require('electron')

// 获取DOM
const sendNews = document.querySelector('.sendNews')

// 渲染进程向主进程发送信息
sendNews.addEventListener('click', function() {
    var news = Math.random();
    ipcRenderer.send('openWindow',news);
})

// 监听新页面传递回来的toIndex事件
ipcRenderer.on('toIndex', function(event,data) {
    alert('新页面传递过来的信息'+data)
})
```

2、紧接着，在主进程中，通过`ipcMain`模块监听到渲染进程发来的消息，再利用`BrowserWindow`创建窗口，最后就是本文的重点，使用`webContents`属性监听窗口创建完成后，将消息发送到新的窗口

> 利用`webContents`发送的消息中还包含了`BrowserWindow.getFocusedWindow().id`传递的当前窗口的指针ID,这一做法的目的，是为了新窗口在接收到信息的同时，还能知道是那个窗口发送而来的信息

```javascript
// ipcMain.js
// 主进程通信模块
const {ipcMain,BrowserWindow} = require('electron')
const path = require('path')
let win = null

// 监听openWindow事件下的异步信息
ipcMain.on('openWindow', function(event, data) {
    // 通过getFocusedWindow静态方法 获取当前焦点窗口的指针ID
    let winId =  BrowserWindow.getFocusedWindow().id
    // 配置窗口
    win = new BrowserWindow({
        width:400,
        height:600,
        webPreferences:{
            nodeIntegration: true
        }
    })
    // 加载页面
    win.loadURL(path.join('file:',__dirname,'../news.html'));
    // 窗口加载完毕后发送toNews消息 将index页面发送的消息及winId发送出去
    win.webContents.on('did-finish-load', function() {
        win.webContents.send('toNews',data,winId)
    })
})

```

3、在新的窗口，通过`ipcRenderer`监听`webContents`发送来的`toNews`事件消息

> 利用`BrowserWindow.fromId(winId)`我们可以获取原窗口`BrowserWindow`对象，再次调用`webContents.send`往原窗口，发送消息，通过这样的方式，就完成了渲染进程间的通信

```javascript
const { ipcRenderer } = require('electron') 
const { BrowserWindow } = require('electron').remote

ipcRenderer.on('toNews',function(event,data,winId) {
        alert(`该消息${data}由${winId}窗口传递的`)
        // 通过winId  返回 该窗口BrowserWindow的对象 
        var firstWin = BrowserWindow.fromId(winId);
        // 通过webContents向该窗口传递信息
        firstWin.webContents.send('toIndex','this is news');
})

```

启动：

```javascript
npm start
```



从上文代码示例，我们可以知道渲染进程间的通信依赖的就是[webContents](https://electronjs.org/docs/api/web-contents#webcontents)。`webContents` 是 [EventEmitter ](https://nodejs.org/api/events.html#events_class_eventemitter)的实例， 负责渲染和控制网页, 是 [`BrowserWindow`](https://electronjs.org/docs/api/browser-window) 对象的一个属性