const { ipcRenderer } =  require('electron');
const { $ } = require('./helper/dom.js');
const path = require('path');

// 
$('#select-music').addEventListener('click', function(e) {
    ipcRenderer.send('open-music-file');
})

// const Store = require('electron-store');
// const store = new Store();

// store.set('unicorn', '🦄');
// console.log(store.get('unicorn'));
// //=> '🦄'

// // Use dot-notation to access nested properties
// store.set('foo.bar', true);
// console.log(store.get('foo'));
// //=> {bar: true}

// store.delete('unicorn');
// console.log(store.get('unicorn'));
// //=> undefined

const renderListHTML = (pathFiles) => {
    const musicList = $('#musicList');
    const musicItemsHTML = pathFiles.reduce((html, musicPath) => {
        html += `<li class="list-group-item">${path.basename(musicPath)}</li>`
        console.log(html,musicPath)
        return html
    },'')
    musicList.innerHTML = '';
    musicList.innerHTML = `<ul class="list-group">${musicItemsHTML}</ul>`;
}

ipcRenderer.on('selected-file', (event,filePath) => {
    if(Array.isArray(filePath)) {
        renderListHTML(filePath);
    }
})