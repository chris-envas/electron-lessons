const { ipcRenderer } = require('electron') 
const { BrowserWindow } = require('electron').remote

ipcRenderer.on('toNews',function(event,data,winId) {
        alert(`该消息${data}由${winId}窗口传递的`)
        // 通过winId  返回 该窗口BrowserWindow的对象 
        var firstWin = BrowserWindow.fromId(winId);
        // 通过webContents向该窗口传递信息
        firstWin.webContents.send('toIndex','this is news');
})
