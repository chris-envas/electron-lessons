const {app, BrowserWindow} = require('electron')

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
})



