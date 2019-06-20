### 第九章

#### 管理文件及url（[shell](https://electronjs.org/docs/api/shell)）

> 使用默认应用程序管理文件和 URL。

进程：主进程、渲染进程

`shell`模块支持在主进程与渲染进程中一同使用，通过它，我们可以完成不少实用的功能，它的用法非常简单，以下将通过代码实例将它的主要功能展示出来



1、配置一个菜单，包含所有`shell`的功能

```javascript
// menu.js
const { Menu,shell,BrowserWindow } = require('electron')
const path = require('path')

// 在本地浏览器加载url
function openWeb(url) {
    shell.openExternal(url)
}
// 在webview标签中加载url
function openWebview(url) {
    // 获取当前窗口
    var win = BrowserWindow.getFocusedWindow();
    // 利用webContents发送信息给当前窗口
    win.webContents.send('openWebview',url);
}
// 打开当前目录
function opendirname (fullPath) {
    shell.showItemInFolder(fullPath)
}
// 打开文件
function openfile (fullPath) {
    shell.openItem(fullPath)
}
// 删掉文件
function deletefile (fullPath) {
    shell.moveItemToTrash(fullPath)
}

//菜单配置
const template = [
    {
        label: 'shell主要功能',
        submenu: [
            {
                label: 'web',
                click:function(){
                    console.log('x')
                    openWeb('https://www.github.com')
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'webview',
                click:function(){
                    openWebview('https://www.github.com')
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'dir',
                click:function(){
                    opendirname(__dirname)
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'file',
                click:function(){
                    let file = path.join(path.resolve(),'news.html')
                    openfile(file)
                }   
            },
            {
                type: 'separator'
            },
            {
                label: 'deletefile',
                click:function(){
                    let file = path.join(path.resolve(),'news.html')
                    deletefile(file)
                }   
            },
            {
                type: 'separator'
            },
            {
                label: 'beep',
                click:function(){
                    // 播放声音
                    shell.beep()
                }   
            }
        ]
    },
]

let m = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(m)
```

> electron的更新迭代貌似还是比较频繁，截止笔者使用的版本是5.0.1，在这个版本中，如果想使用webview标签，我们还需在主进程声明一下，否则将无法加载...
>
> 问题描述：https://github.com/electron/electron/issues/18145

```javascript
// main.js
...
function createWindow(){
  ...
        webPreferences: {
            // 开启node
            nodeIntegration: true,
            // 新增允许使用webview标签
            webviewTag: true
        },
  ...
}
...
```

启动：

```javascript
npm start
```



`shell`的所有功能都已经配置在菜单中了，它的使用非常简单！