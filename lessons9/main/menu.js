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
                    console.log('clcik')
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