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
