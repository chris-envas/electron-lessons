### 第六章

#### 渲染进程与主进程的通信模块（[ipcMain](https://electronjs.org/docs/api/ipc-main#eventreturnvalue)，[ipcRenderer](https://electronjs.org/docs/api/ipc-renderer)）

ipcMain：主进程

从主进程到渲染进程的异步通信。

ipcRenderer: 渲染进程

从渲染器进程到主进程的异步通信。



下面是一个完整的代码实例

```javascript
//index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
  <div>
      <button class="sendMain">发送一条异步消息到主进程</button>
      <button class="sendMainSync">发送一条同步消息到主进程</button>
      <script src="./renderer/ipcRenderer.js"></script>
  </div>
</body>
</html>

```

```javascript
//ipcRenderer.js
// 渲染进程下的通信模块
const {ipcRenderer} = require('electron')

// 获取DOM
const sendMain = document.querySelector('.sendMain')
const sendMainSync = document.querySelector('.sendMainSync')

// 向主进程发送名为sendMain的异步信息
sendMain.addEventListener('click', function() {
    ipcRenderer.send('sendMain','this is a sync news')
})

// 监听主进程对sendMain事件的异步返回结果
ipcRenderer.on('replay', function(event,arg) {
    alert(arg)
})

// 向主进程发送名为sendMainSync的同步信息
sendMainSync.addEventListener('click', function() {
    // 同步信息可直接获取返回结果
    var retunValue = ipcRenderer.sendSync('sendMainSync','this is a news')
    alert(retunValue)
})
```

```javascript
// ipcMain.js
// 主进程通信模块
const {ipcMain} = require('electron')

// 监听sendMain事件下的异步信息
ipcMain.on('sendMain', function(event, data) {
    event.reply('replay',data+'主进程接收到的异步信息')
})

// 监听sendMainSync事件下的同步信息
ipcMain.on('sendMainSync', function(event, data) {
    // 同步信息直接返回结果
    event.returnValue = data+'主进程接收到的同步信息'
})
```

启动：

```javascript
npm start
```

