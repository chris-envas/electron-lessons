var { ipcMain } = require('electron');

ipcMain.on('ondragstart', function(event, filepath) {
    console.log(filepath)
    event.sender.startDrag({
        file: filepath,
        icon: '/path/to/icon.png'
    })
})