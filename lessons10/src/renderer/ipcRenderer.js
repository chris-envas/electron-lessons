const {ipcRenderer,remote}=require('electron');

const fs =require('fs')

var edit = document.querySelector('#edit');
document.addEventListener('contextmenu',function(e){
    e.preventDefault();
    ipcRenderer.send('contextMenu');
})

ipcRenderer.on('action',function(event,action) {
    let win = remote.BrowserWindow.getFocusedWindow();
    switch(action) {
        case 'open':
            var option = {
                properties: ['openFile']
            };
            remote.dialog.showOpenDialog(option,function(dir){
                var fileData = fs.readFileSync(dir[0]);
                edit.innerHTML = '';
                edit.innerHTML = fileData;
            });
            break;
        case 'save':
            var option = {
                defaultPath: '',
                filters: [
                    { name: 'All Files', extensions: ['*'] }
                  ]
            }
            remote.dialog.showSaveDialog(option,function(dir) {
                fs.writeFileSync(dir,edit.value,function(err){
                    if(!err) {
                        alert('yes')
                    }
                })
            })
            break;
    }
})