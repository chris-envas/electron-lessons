const {app,BrowserWindow} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 300,
        webPreferences: {
            nodeIntegration: true
        }
    })
    const url  = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './build/index.html')}`
    mainWindow.loadURL(url)
})