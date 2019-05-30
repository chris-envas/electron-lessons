const {
    Menu
} = require('electron')

var template = [{
        label: '文件',
        submenu: [{

                label: '新建文件',
                accelerator: 'ctrl+n',
                click: function () {
                    console.log('ctrl+n');
                }
            },
            {

                label: '新建窗口',
                accelerator: 'ctrl+w',
                click: function () {
                    console.log('new window');
                }
            }
        ]
    },
    {
        label: '编辑',
        submenu: [
            {
                label: '复制',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy'
            },
            {
                label: '剪切',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut'
            }
        ]
    }
]

var m = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(m);