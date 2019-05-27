### 第四章

#### 系统快捷键

`globalShortcut` 模块可以在操作系统中注册/注销全局快捷键, 以便可以为操作定制各种快捷键。但只能在**主进程**中使用

`globalShortcut`主要接收两个参数，分别为注册的快捷键和回调函数

```javascript
//main.js
const {app, BrowserWindow, globalShortcut} = require('electron')

let win = null

app.on('ready', () => {
    var WindowOption = {
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration:true
       }
    }
    win = new BrowserWindow(WindowOption)
    win.loadFile('index.html')
    win.on('closed',() => {
        win = null
    })

    const ret = globalShortcut.register('CommandOrControl+X', () => {
        console.log('CommandOrControl+X is pressed')
    })

    if (!ret) {
        console.log('registration failed')
    }
    
    // 检查快捷键是否注册成功
    console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})
```



### 复制粘贴板

`clipboard`支持在主进程和渲染进程中使用。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>electron</title>
    <style>
    
    </style>
</head>
<body>
    <div>
        <span id="paste">粘贴</span>
        <input id='copyInput' type="text" placeholder='已复制! 请在这里执行粘贴'>
    </div>
    <script src="render/index.js"></script>
</body>
</html>
```

```javascript
const { clipboard } = require('electron')

clipboard.writeText('Example String')

let copyInput = document.querySelector('#copyInput')
let paste = document.querySelector('#paste')

paste.addEventListener('click', function() {
    if (copyInput.value !== '') copyInput.value = ''
    copyInput.value = clipboard.readText()
})
```

启动

```shell
npm start
```

![启动](https://s2.ax1x.com/2019/05/27/VZlTY9.png)

点击粘贴即可获取复制的内容