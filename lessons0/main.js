const {app, BrowserWindow} = require('electron')

let win = null

app.on('ready', () => {
    var WindowOption = {
        width:400,
        height:400
    }
    win = new BrowserWindow(WindowOption)
    win.loadFile('index.html')

    win.on('closed',() => {
        win = null
    })
})



