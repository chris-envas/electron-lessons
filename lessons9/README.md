### 第十章

#### 系统对话框（[dialog](https://electronjs.org/docs/api/dialog)）

进程：主进程

`Electron`为我们提供了桌面端的提示对话框形式，下面让我们共同了解一下



下面是一个完整的代码实例

```javascript
//index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
  <div>
      <button class="errBox">错误提示对话框</button>
      <button class="infoBox">信息提示对话框</button>
      <button class="dirBox">打开目录对话框</button>
      <button class="saveBox">保存文件对话框</button>
      <script src="./renderer/dialog.js"></script>
  </div>
</body>
</html>
```

```javascript
// dialog.js
// dialog本身是主进程的模块，这里为了方便我通过渲染进程的remote模块调用，原因后面讲
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
```

启动：

```javascript
npm start
```

`dialog`模块的使用非常简单，它的参数配置也十分丰富，足够满足我们的需求，一般来说`dialog`都会放在主进程来使用，通过**渲染进程与主进程间的通信**我们可以实现复杂的交互。

