本文主要介绍主要从0到1介绍，如何基于create-react-app脚手架构建electron应用并进行打包



## 写在开头

> 温馨提示：如果由于网络原因，以下安装出现失败，建议你上飞机
>
> 因为不少包在构建过程中会下载一些文件，容易因网络问题导致失败
>
> 如果你使用诸如ss、ssr等工具,这里推荐一款非常好用的http代理服务器软件polipo，将socks5转到到http，然后在命令行中输入export http_proxy="http://127.0.0.1:1080" ，此时你的命令行在构建时，会自动走http代理
>
> 你也可以手动进行为你的包管理工具设置，如
>
> npm config set http_proxy="http://127.0.0.1:1080" 
>
> yarn config http_proxy="http://127.0.0.1:1080"



## 正文

安装npx

```javascript
npm install npx -g
```

创建react项目工程

```javascript
npx create-react-app builder
```

安装electron、及electron-builder、electron-is-dev

> 下载失败怎么办？怎么解决，我在开头写了

```javascript
yarn add electron electron-builder --save-dev
yarn add electron-is-dev 
```

创建main.js

```javascript
touch main.js
```

编写文件main.js

```javascript
const {app,BrowserWindow} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 300,
        webPreferences: {
            nodeIntegration: true
        }
    })
    const url  = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './build/index.html')}`
    mainWindow.loadURL(url)
})
```

在package.json中增加以下字段

```javascript
...
"main":"main.js",
...
```

测试项目运行是否正常

```shell
yarn start 
yarn electron 
```

开始构建项目安装包

> electron-builder在构建打包时，是依赖于项目中package.json的配置项进行打包的，配置中注释的部分，都是为了配合electron-builder的打包需求

```javascript
{
 ...
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-scripts": "3.4.0"
  },
  "devDependencies": {
    "electron": "^8.0.1",  // 必须存放在devDependencies中
    "electron-builder": "^22.3.2" //必须存放在devDependencies中
  },
  "homepage": "./", //react引用资源使用相对路径
  "main":"main.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "pack": "electron-builder --dir", // 输出打包目录
    "dist": "electron-builder" //输出程序安装包
  },
  "author": {
    "name": "your name", // 必填
    "email": "your email" // 必填
  },
  "description": "this is  app", // 必填
  "build": {
    "appId": "app", // 必填
    "productName": "pigeon", // 必填
    "copyright": "Copyright © 2020 ${author}", // 必填
    "extends": null, // 必填
    "directories": {
      "buildResources": "assets" // 必填
    },
    // mac程序的的打包配置 默认输出dmg安装包
    "mac": { 
      "category": "public.app-category.productivity",
      "artifactName": "${productName}-${version}-${arch}.${text}"
    },
    "dmg": {
      "background": "assets/appdmg.png",
      "icon": "assets/icon.icns",
      "iconSize": 100,
      "contents": [
        {
          "x": 380,
          "y": 280,
          "type": "link",
          "path": "/Applications"
        },
        {
          "x": 110,
          "y": 280,
          "type": "file"
        }
      ],
      "window": {
        "width": 500,
        "height": 500
      }
    },
     // win下的打包配置，默认输出nsis安装包
    "win": {
      "target": [
        "nsis"
      ],
      "artifactName": "${productName}-Setup-${version}.${ext}",
      "publisherName": "chris"
    },
    "nsis": {
      "allowToChangeInstallationDirectory": true,
      "oneClick": false,
      "perMachine": false
    },
    // 告知electron-builder 需要保存的文件
    "files": [
      "build/**/*",
      "node_module/**/*",
      "package.json",
      "main.js"
    ]
  },
 ...
}
```

react打包

```java
npm run build
```

测试electron打包

```javascript
npm run pack
```

![3QkS78.png](https://s2.ax1x.com/2020/02/22/3QkS78.png)

打包成功！！项目根目录生成一个dist目录，里面就是打包后的应用

接下来制作electron程序安装包，与上述步骤一样，electron-builder会进行构建

```javascript
npm run dist
```





## 其他

**如果你出现以下报错，很有可能是网络问题，参照开头所讲**

node-sass很容易因为网络问题下载失败，因为npm每次都会下载一个.node文件

```javascript
Error: Unresolved node modules: node-sass
    at Collector.resolveUnresolvedHoisted (C:\Users\Administrator\Desktop\pegio\node_modules\electron-builder-...
```

网络资源下载403

```she
part download request failed with status code 403
github.com/develar/app-builder/pkg/download.(*Part).doRequest
```





