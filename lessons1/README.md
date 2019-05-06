### 第二章

#### 主进程与渲染进程

我们需要先明白，主进程和渲染进程是什么？



**主进程**

Electron使用前端技术作为APP的GUI,可以把它当做一个小型的Chrome内核浏览器，在`package.json`文件中的`main`键值就是主进程文件，主进程只有一个！

**渲染进程**

依赖于chrome内核的多进程架构，我们可以在Electron的每个页面使用自己的线程，这些线程称为渲染进程

与在普通浏览器不同的是，在每个页面中，我们可以使用Node.js的API，可以在一定程度上与操作系统进行交互



根据上面的说法，我们马上尝试一下两个练习

1、打开APP的时候启动两个窗口

2、利用nodejs获取`package.json`的内容

新建`index.html`、`new.html`

```html
//index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>test</title>
</head>
<body>
    <div class="main">
        hello world peter
    </div>
    <script src="render/index.js"></script>
</body>
</html>
```

```html
//new.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>新页面</title>
</head>
<body>
    <div class="main">
        hello world envas
    </div>
</body>
</html>
```

```javascript
//index.js
let fs = require('fs')

fs.readFile('package.json',(err,data) => {
  if(!err){
    var main = document.querySelector('.main')
    main.innerHTML = main.innerHTML + data
  }
})
```

```javascript
const {app, BrowserWindow} = require('electron')
let onewin = null
let twowin = null

app.on('ready', () => {
    var WindowOption = {
        width:400,
        height:400,
        //开启Node环境
        webPreferences:{
            nodeIntegration:true
       }
    }
    onewin = new BrowserWindow(WindowOption)
    onewin.webContents.openDevTools()
    onewin.loadFile('index.html')
    onewin.on('closed',() => {
        win = null
    })
    twowin = new BrowserWindow(WindowOption)
    twowin.loadFile('new.html')
    twowin.on('closed',() => {
        win = null
    })
})
```

**启动**

```powershell
npm start
```

![示例](https://s2.ax1x.com/2019/05/06/EDhKhD.png)



