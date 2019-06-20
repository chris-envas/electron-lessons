### 第六章

#### 菜单模块（[Menu](https://electronjs.org/docs/api/menu)）

进程：主进程

`Menu` 创建原生应用菜单和上下文菜单。



下面是部分实例代码

```javascript
//在渲染进程调用Menu模块
const {Menu}=require('electron').remote;

//定义菜单
var template=[
    {

        label:'文件',
        submenu:[
            {
                label:'新建文件',
                // 注册快捷键
                accelerator:'ctrl+n',
                // 点击触发回调
                click:function(){ 
                    console.log('ctrl+n');
                }
            },
            {
                label:'新建窗口',
                click:function(){ 
                    console.log('new window');
                }
            }
        ]
    },
    {
        label:'编辑',
        submenu:[
            {
                label:'复制11',
                //使用内置角色
                role:'copy'
            },
            {
                label:'截切',
                role:'cut'
            }
        ]
    }
]

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

//右键菜单事件
window.addEventListener('contextmenu',function(e){
    //阻止当前窗口默认事件
    e.preventDefault();

    //在当前窗口点击右键的时候弹出  定义的菜单模板
    menu.popup({window:remote.getCurrentWindow()})

},false)
```

[菜单模板配置参数等相关信息](https://electronjs.org/docs/api/menu-item)

启动

```javascript
npm start
```





