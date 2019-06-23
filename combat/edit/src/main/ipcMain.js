
var {Menu,shell,ipcMain,BrowserWindow,app} =require('electron');

var template = [
    {
        label: '文件',
        submenu: [
            {
                label: '新建',
                accelerator: 'Ctrl+N',
                click: function(){
                   //新建 
                   BrowserWindow.getFocusedWindow().webContents.send('action','new');
                }

            },
            {
                label: '打开',
                accelerator: 'Ctrl+O',
                click: function(){
                    // 打开文件
                    BrowserWindow.getFocusedWindow().webContents.send('action','open');
                }
            },
            
            {   
                label: '保存',
                accelerator: 'Ctrl+S',
                click: function(){
                    // 保存文件
                    BrowserWindow.getFocusedWindow().webContents.send('action','save');
                }
            },
            {
                type: 'separator'
            },
            {
                label: '打印',
                accelerator: 'Ctrl+I',
                click: function(){
                    BrowserWindow.getFocusedWindow().webContents.print();  
                }
            },
            {
                label: '退出',
                accelerator: 'Ctrl+Q',
                click: function(){
                   BrowserWindow.getFocusedWindow().webContents.send('action','exit')                    
                }   
            }
        ]
    },
    {
        label: '编辑',
        submenu: [
            {
                label: '加载',
                role: 'reload'
            },
            {
                label: '撤销',
                role: 'undo'
            },
            {
                label: '恢复',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {   label: '截切',
                role: 'cut'
            },
            {
                label: '复制',
                role: 'copy'
            },
            {
                label: '黏贴',
                role: 'paste'
            },
          
            {
                label: '删除',
                role: 'delete'
            },
            {
                label: '全选',
                role: 'selectall'
            }
        ]
    },    
    {
        label: '视图',
        submenu: [
           
           
            {
                label: '缩小',
                role: 'zoomin'
            },
            {   label: '放大',
                role: 'zoomout'
            },
            {   label: '重置缩放',
                role: 'resetzoom'
            },
            {
                type: 'separator'
            },
            {
                label: '全屏',
                role: 'togglefullscreen'
            }
        ]
    },
    {
        label: '帮助',
        submenu: [
            {
                label: '关于',
                click() { 
                    shell.openExternal('https://github.com/luojinxu520/electron-lessons');
                }
            }
        ]
    }
];

var m=Menu.buildFromTemplate(template);
Menu.setApplicationMenu(m);


const contextMenuTemplate=[
    // {
    //     label: '撤销',
    //     role: 'undo'
    // },
    // {
    //     label: '恢复',
    //     role: 'redo'
    // },
    // {
    //     type: 'separator'
    // },
    {   label: '截切',
        role: 'cut'
    },
    {
        label: '复制',
        role: 'copy'
    },
    {
        label: '黏贴',
        role: 'paste'
    },
    { type: 'separator' },  //分隔线
    { label: '全选',
        role: 'selectall' 
    }   //Select All菜单项
];

var contextMenu=Menu.buildFromTemplate(contextMenuTemplate);

// 监听右键事件
ipcMain.on('contextMenu',() => {
    contextMenu.popup(BrowserWindow.getFocusedWindow())
})

ipcMain.on('exit-app', () => {
    app.quit();
})