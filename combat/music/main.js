// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const path = require('path');
const Store = require('electron-store');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

class Windowclsss extends BrowserWindow {
  constructor (config,loadFile)　{
    // 默认窗口配置
    const baseConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true
      },
      show: false
    }
    const findConfig = {...baseConfig, ...config}
    super(findConfig);
    this.loadFile(loadFile);
    this.once('ready-to-show', () => {
      this.show();
    })
  }
}

function createWindow () {
  // Create the browser window.
  mainWindow = new Windowclsss({},'./renderer/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null;
  })

  ipcMain.on('add-music-window', () => {
    let option = {
        width: 500,
        height: 400,
        webPreferences: {
          nodeIntegration: true
        },
        parent: BrowserWindow.getFocusedWindow(),
        backgroundColor:'#66CD00',
        title: '添加音乐',
        transparent: true
    }
    let addMusicWindow = new Windowclsss(option,'./renderer/addMusic.html');
    // addMusicWindow.webContents.openDevTools()
  })

  ipcMain.on('open-music-file', (event) => {
    dialog.showOpenDialog({
      properties: ['openFile','multiSelections'],
      filters: [
        { name: 'Music', extensions: ['mp3'] }
      ]
    },(filesPath) => {
      if(filesPath) {
        event.sender.send('selected-file', filesPath);
      }
    })
  })
}


app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
})

app.on('activate',() => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
})

