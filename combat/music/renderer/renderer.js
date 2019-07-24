
const { ipcRenderer } = require('electron');
const { $ } = require('./helper/dom.js');


$('#add-music-window').addEventListener('click', function(e) {
    ipcRenderer.send('add-music-window');
})
