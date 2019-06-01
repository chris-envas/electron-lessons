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