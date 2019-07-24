### 第八章

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

// 渲染进程向主进程openWindow事件
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

> 利用`webContents`发送的消息中还包含了`BrowserWindow.getFocusedWindow().id`传递的当前窗口的指针id。
>
> 这一做法的目的，是为了新窗口在接收到信息的同时，获取到发送消息的窗口的对象`BrowserWindow`对象

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
    /*
    窗口加载完毕后（did-finish-load）发送toNews消息 
    发送的内容分别为，index页面发送的消息及index页面的窗口Id
    */
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



从上文代码示例，我们可以知道渲染进程间的通信关键在于[webContents](https://electronjs.org/docs/api/web-contents#webcontents)。`webContents` 是 [EventEmitter ](https://nodejs.org/api/events.html#events_class_eventemitter)的一个实例， 负责渲染和控制网页, 是 [`BrowserWindow`](https://electronjs.org/docs/api/browser-window) 对象的一个属性



扩展

----



文章本来到这里就应该结束了，最近发现了关于`webContents`的一些其他用法，直接上代码了

```javascript
ipcMain.on('open-music-file', (event) => {
    dialog.showOpenDialog({
      properties: ['openFile','multiSelections'],
      filters: [
        { name: 'Music', extensions: ['mp3'] }
      ]
    },(filesPath) => {
      if(filesPath) {
        event.sender.send('selected-file', filesPath);
      }
    })
  })
```

从以上代码中可以看到，我使用`ipcMain`监听渲染进程一个名为`open-music-file`的事件，通过`dialog`模块打开文件对话框，当选中文件后，我设置在`dialog.showOpenDialog`的回调函数就可以获取选中的文件路径，接下来就是重点，我使用了`ipcMain`回调函数中的`event`对象触发了`selected-file`事件传递了文件路径信息

重点就是

[event.sender](https://electronjs.org/docs/api/ipc-main#eventsender)会返回`webContents`对象，所以`event.sender.send`可以出发对应地渲染进程的事件监听

更新于2019-07-24