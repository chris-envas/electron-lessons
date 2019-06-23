/* 
文件操作逻辑
新建
1、 若已存在内容，则需进行保存，保存后自动清空文本
打开
1、若打开的文件存在变更文件，则需进行保存，保存后自动调起打开文件对话框
保存
1、保存变更的文件

函数
askSaveDialog
1、isSave为false则需进行保存
2、当文本域输入时isSave保持为false状态
*/
const {ipcRenderer,remote}=require('electron');
const fs =require('fs');
let isSave = true;
var currentFile = '';

// 自动设置标题
document.title = '无标题';
// 监听右键事件
document.addEventListener('contextmenu',function(e){
    e.preventDefault();
    ipcRenderer.send('contextMenu');
})

// 当文本域输入时
edit.oninput = function() {
    if(isSave) document.title += ' *';
    isSave = false;
}
// 渲染进程监听主进程消息
ipcRenderer.on('action',function(event,action) {
    let win = remote.BrowserWindow.getFocusedWindow();
    switch(action) {
        case 'open':
            askSaveDialog()
            var option = {
                properties: ['openFile']
            };
            remote.dialog.showOpenDialog(option,function(dir){
                console.log(dir)
                var fileData = fs.readFileSync(dir[0]);
                console.log(fileData)
                currentFile = dir[0];
                edit.value = '';
                edit.setValue(fileData);
                document.title =  dir[0];
            });
            break;
        case 'save':
            saveDialog();
            break;
        case 'new':
            askSaveDialog();
            edit.setValue('');
            break;
        case 'exit':
            askSaveDialog();
            ipcRenderer.send('exit-app')
            break;
    }
})

function askSaveDialog() {
      var index = true;
      if(!isSave) {
            index  = remote.dialog.showMessageBox({
            type:"question",
            message:'是否要保存此文件?',
            buttons:['Yes','No']
          })
      }  

      if(!index){
        //执行保存操作
        saveDialog();
    }
}
function saveDialog() {
    if(!currentFile) {
        // 第一次保存
        var option = {
            defaultPath: '',
            filters: [
                { name: 'All Files', extensions: ['*'] }
            ]
        }
        var dir = remote.dialog.showSaveDialog(option)
        if(dir) {
            currentFile = dir;
            fs.writeFileSync(currentFile,edit.getValue())
            isSave = true;
            document.title = currentFile;
            alert('保存成功');
        }
    }else{
        // 已保存过则清除文本内容
        fs.writeFileSync(currentFile,edit.getValue())
        isSave = true;
        edit.value = '';
        document.title = '无标题';
        currentFile= '';
        alert('保存成功');
    }
}