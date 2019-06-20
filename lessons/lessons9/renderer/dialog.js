const { dialog,BrowserWindow } = require('electron').remote

const errBox = document.querySelector('.errBox')
const dirBox = document.querySelector('.dirBox')
const infoBox = document.querySelector('.infoBox')
const saveBox = document.querySelector('.saveBox')

errBox.addEventListener('click', function() {
    dialog.showErrorBox('错误提示','这是一条错误信息')
})

infoBox.addEventListener('click', function() {
    const option = {
        type: 'info',
        title: '信息',
        message: '这是一条信息对话框',
        buttons: ['yes','no']
    }
    dialog.showMessageBox(option,function (index) {
        // index是你选择按钮的索引
        alert(index)
    })
})

dirBox.addEventListener('click', function() {
    let windows = BrowserWindow.getFocusedWindow()
    dialog.showOpenDialog(windows,{
        // 允许选择文件及文件夹
        properties: ['openFile','openDirectory']
    },function(filePaths) {
        // 弹出你所选择的文件或文件夹的路径
        alert(filePaths)
    })
})

saveBox.addEventListener('click', function() {
    const options = {
        title: '保存图片',
        // 可以指定可显示文件的数组类型
        filters: [
          { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
        ],
        // 保存文件默认名
        defaultPath: __filename
      }
    dialog.showSaveDialog(options, function (filename) {
        // 保存文件所在路径
        alert(filename)
    })
})