const path = require('path')
const item = document.querySelector('#openWindow')
const { BrowserWindow } = require('electron').remote


item.addEventListener('click', () => {
  let win = new BrowserWindow({ width: 400, height: 400 })
  var file = path.join('file:///', __dirname, 'new.html')
  win.loadURL(file)
  win.on('closed', function() {
    win = null
  })
})