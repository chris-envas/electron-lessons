Electron入门系列一

如果你是第一次接触Electron，你应该先去[官网](https://electronjs.org/)了解看看，通过官方提供的一个快速启动程序，立即看看Electron是如何运转的

```javascript
# 克隆示例项目的仓库
$ git clone https://github.com/electron/electron-quick-start

# 进入这个仓库
$ cd electron-quick-start

# 安装依赖并运行
$ npm install && npm start
```

如果你对Electron有所了解，请直接使用[electron-vue](https://github.com/SimulatedGREG/electron-vue)进行快速开发



#### 开始

现在，让我们一起从头到尾构建并了解Electron

```powershell
# 创建目录
$ mkdir electron-test

# 进入
$ cd electron-test

# 创建UI界面文
$ touch index.html

# 创建主进程文件
$ touch main.js

# 创建package.json
$ npm init 

# 安装依赖
$ npm i electron --save
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>test</title>
</head>
<body>
    hello world
</body>
</html>
```

```javascript
//main.js
const {app, BrowserWindow} = require('electron')

let mainWindow = null

// Electron初始化后，执行该回调函数
app.on('ready', () => {
    // 窗口配置参数
    var WindowOption = {
        width:400,
        height:400
    }
    // 实例化窗口
    mainWindow = new BrowserWindow(WindowOption)
    // 加载界面
    mainWindow.loadFile('index.html')
	//窗口被关闭时
    mainWindow.on('closed',() => {
        mainWindow = null
    })
})
```

```javascript
//package.json
{
...
  "scripts": {
    +"start": "electron ."
  },
 ...
}

```

启动

```powershell
npm start
```

结果

![start](https://s2.ax1x.com/2019/05/03/EUjPv4.png)

简单几行代码，我们就创建出一个electron应用，虽然它很简陋，接下来让我们一起探索它！









