const {app, BrowserWindow, globalShortcut} = require('electron')

let win = null

app.on('ready', () => {
    var WindowOption = {
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration:true
       }
    }
    win = new BrowserWindow(WindowOption)
    win.loadFile('index.html')
    win.on('closed',() => {
        win = null
    })
    const ret = globalShortcut.register('CommandOrControl+X', () => {
        console.log('CommandOrControl+X is pressed')
    })
    if (!ret) {
        console.log('registration failed')
    }
    // 检查快捷键是否注册成功
    console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})



