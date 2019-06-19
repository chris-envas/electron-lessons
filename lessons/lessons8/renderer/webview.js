const { ipcRenderer } = require('electron')

var webview = document.querySelector('#webview')

ipcRenderer.on('openWebview',function(event,data){
    webview.src=data;
})
