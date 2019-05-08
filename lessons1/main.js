const {app, BrowserWindow} = require('electron')

let onewin = null
let twowin = null

app.on('ready', () => {
    
    var WindowOption = {
        width:400,
        height:400,
        webPreferences:{
            nodeIntegration:true
       }
    }
    onewin = new BrowserWindow(WindowOption)
    onewin.loadFile('index.html')

    onewin.on('closed',() => {
        win = null
    })

    twowin = new BrowserWindow(WindowOption)
    twowin.loadFile('new.html')

    twowin.on('closed',() => {
        win = null
    })
})



