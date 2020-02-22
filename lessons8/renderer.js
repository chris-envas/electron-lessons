const {ipcRenderer} = require('electron')
ipcRenderer.on('to-render',(event, message) => {
    console.log(event,message)
})
