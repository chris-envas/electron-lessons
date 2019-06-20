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