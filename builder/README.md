本文主要介绍主要从0到1介绍，如何基于create-react-app脚手架构建electron应用并进行打包并进行自动化的发布

## 构建安装包

> 写在前面
>
> 如果由于网络原因，出现安装或构建的失败，强烈建议你fanqiang，而这种原因排查起来一般都很蛋疼！因为不少包在构建过程中会下载一些文件，容易因网络问题导致失败。
>
> 如果你使用诸如ss、ssr等工具,这里推荐一款非常好用的http代理服务器软件polipo，将socks5转到到http，然后在命令行中输入export http_proxy="http://127.0.0.1:1080" ，此时你的命令行在构建时，会自动走http代理。
>
> 你也可以手动进行为你的包管理工具设置，如：
>
> npm config set http_proxy="http://127.0.0.1:1080" 
>
> yarn config http_proxy="http://127.0.0.1:1080"

## 开始

安装npx

```javascript
npm install npx -g
```

创建react项目工程

```javascript
npx create-react-app builder
```

安装electron、及electron-builder、electron-is-dev

> electron和electron-builder比较难下载，记得保证网络通畅！

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
yarn dev
```



如果可以正常启动，则开始构建项目安装包

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

先对react进行打包

```java
npm run build
```

测试electron打包（注意，这里打包的结果，是直接输出安装包的目录，不是一个可安装的程序包）

```javascript
npm run pack
```

![3QkS78.png](https://s2.ax1x.com/2020/02/22/3QkS78.png)

接下来制作electron程序安装包，与上述步骤一样，electron-builder会进行构建

```javascript
npm run dist
```

[![3tDpzn.md.png](https://s2.ax1x.com/2020/02/25/3tDpzn.md.png)](https://imgchr.com/i/3tDpzn)

查看安装包

[![3tDnzR.png](https://s2.ax1x.com/2020/02/25/3tDnzR.png)](https://imgchr.com/i/3tDnzR)

### 其他

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

### 体积优化

Electron的包体积是最令人诟病的一点，使用electron-builder进行打包构建的时候，可以优化体积的主要部分是node_module的体积，dependencies是webpack打包构建web应用时的模块选项，第一个优化的地方就是要保证它的依赖项，尽可能的只包含应用本身所需，防止其他依赖也被纳入其中，此步骤是最简单也是最有效的，我就不演示了

第二个优化的地方，就是将electron的主进程文件，同样的使用webpack进行打包，这里默认使用main.js作为我们项目的主进程文件，创建webpack.config.js

```javascript
//webpack.config.js
const path = require('path')

module.exports = {
    target: 'electron-main',
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'main.js'
    },
    node: {
        __dirname: false
    },
    mode: "production"
}
```

注意这里 **target = 'electron-main'** 不要写错 ,这里是告知webpack,本次将进行electron的打包

强大的webpack为我们提供了好几种兼容的构建目标，我们平常开发的应用都是node环境，所以大部分的webpack打包环境默认都是 **terget='node'** ，如果你对webpack的target选项有兴趣可以去了解[更多](https://webpack.js.org/configuration/target/)

紧接着，在package.json增加新的字段，如下所示

```javascript
...
+"main": "./build/main.js", // 重新构建的主进程文件，将被打包到build目录下
"scripts": {
    ...
  + "build-main": "webpack", //main.js编译打包
}
...
```

安装webpack

```javascript
yarn add webpack
```

开始进行elctron的主进程文件打包构建过程中

> webpack还要求你另外安装webpack-cli,直接yes通过即可，原因是webpack目前分离webpack-cli的部分，所以独立进行安装

```javascript
npm run build-main
```

打包成功

[![3t0VmT.png](https://s2.ax1x.com/2020/02/25/3t0VmT.png)](https://imgchr.com/i/3t0VmT)

查看打包的文件

[![3t016x.png](https://s2.ax1x.com/2020/02/25/3t016x.png)](https://imgchr.com/i/3t016x)



## 自动发布

electron-builder提供了几种[publish](https://www.electron.build/configuration/publish#githuboptions)的方法,本文选用github,作为自动发布的平台

首先，你需要在github生成个人访问令牌，[personal access token](https://github.com/settings/tokens),记住生成的token直会显示一次，记得保存好

具体的操作，请参考 [这篇文章](https://help.github.com/en/enterprise/2.17/user/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)

OK，修改package.json,如下所示：

```javascript
{
  ...
 +"repository": "xxx.com", // 注明你的仓库地址，
  "scripts": {
    ...
  + "release": "cross-env GH_TOKEN=822aac8df6d4d6237d29475e02aee30c42185a59 electron-builder", // 自动发布脚本
    ...
  + "prerelease": "npm run build && npm run build-main",
  },
  "build": {
    ...
   +"publish": ["github"], //告知electron-builder自动发布平台，每个平台参数各有不同
    ...
  },
  ...
}
```

最重要的就是**release**字段，它将作为我们构建发布的脚本

 `cross-env GH_TOKEN=822aac8df6d4d6237d29475e02aee30c42185a59 electron-builder`

cross-env是可靠的跨平台设置环境变量的依赖，这里我们需要设置一个环境变量 **GH_TOKEN**，electron-builder 检测到这个环境变量，就会自动进行发布，该环境变量的值就是我们最开始申请的token!

```javascript
npm run release
```

发布成功

[​![3tsOZ6.png](https://s2.ax1x.com/2020/02/25/3tsOZ6.png)](https://imgchr.com/i/3tsOZ6)

前往release页面查看

[![3tykeP.png](https://s2.ax1x.com/2020/02/25/3tykeP.png)](https://imgchr.com/i/3tykeP)



## 结束

你可以直接[clone](https://github.com/luojinxu520/electron-lessons/tree/master/builder/)本项目代码，运行尝试打包！本文所有步骤，笔者均测试完毕！

### 关于打包

electron的打包工具有以下几个

- **[electron-builder](https://github.com/electron-userland/electron-builder)** 
- **[electron-packager](https://github.com/electron/electron-packager)** 

主流的全家桶开发环境，供你选择

- **[electron-react-boilerplate- react全家桶+webpack+electron+electron-builder](https://github.com/electron-react-boilerplate/electron-react-boilerplate)**
- **[electron-vue - vue全家桶+webpack+electron+electron-packger+electron-builder](https://github.com/SimulatedGREG/electron-vue)** 

### 关于自动发布

往后有新的版本发布怎么办？只需要修改package.json中的 **version** 字段即可，electron-builder以它作为版本发布的校验规则！

本文仅此，抛砖引玉，希望能对你有所帮助！