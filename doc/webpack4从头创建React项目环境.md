### webpack4从头创建React项目环境

#### webpack搭建

----

1、创建项目

```shell
mkdir reactDemo
cd reactDemo
```

2、创建package.json

```javascript
npm init 
//或
npm init -y
```

3、安装webpack4环境

> webpack4以上版本webpack与webpack-cli需要分别安装，因为二者已被分离出来

```javascript
npm i webpack@4 webpack-cli@3 -D
//或
yarn add webpack@4 webpack-cli@3 -D
```

4、更新package.json

```javascript
{
  "name": "reactDemo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "webpack --mode development",
    "build": "webpack --mode production"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.34.0",
    "webpack-cli": "^3.3.4"
  }
}

```

5、安装React

```javascript
npm i react@16 react-dom@16 -S
```

6、安装依赖

```javascript
npm i babel-loader@8 @babel/core @babel/preset-env @babel/preset-react -D
```

- [babel-loader](https://github.com/babel/babel-loader)：使用 Babel 转换 JavaScript依赖关系的 Webpack 加载器
- [@babel/core](https://babeljs.io/docs/en/babel-core)：即 babel-core，将 ES6 代码转换为 ES5
- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)：即 babel-preset-env，根据您要支持的浏览器，决定使用哪些 transformations / plugins 和 polyfills，例如为旧浏览器提供现代浏览器的新特性
- [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)：即 babel-preset-react，针对所有 React 插件的 Babel 预设，例如将 JSX 转换为函数

7、配置webpack.config.js

>

```shell
touch webpack.config.js
```

```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: 'node_modules',
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}
```

8、配置.babelrc

> babel是一个javascript编译器，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

```javascript
{
    "presets":["@babel/preset-env,@babel/preset-react"]
}
```

9、在**src**目录下分别创建index.js和index.html

```javascript
import React from 'react';
import ReactDom from 'react-dom';

const Index = () => {
    return <div>hello world!</div>
};

ReactDom.render(<Index />,document.getElementById('app'));

```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

10、安装[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)，该插件会将打包好的js注入到html中

```javascript
npm i html-webpack-plugin -D
```

11、安装[webpack-dev-server](https://webpack.js.org/configuration/dev-server/)，并更新package.json

```javascript
npm i webpack-dev-server -D
```

```javascript
{
  "name": "reactDemo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --mode development --open 'Google Chrome' --hot",
    "build": "webpack --mode production"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.4.5",
    "@babel/preset-env": "^7.4.5",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.6",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.34.0",
    "webpack-cli": "^3.3.4",
    "webpack-dev-server": "^3.7.2"
  },
  "dependencies": {
    "react": "^16.8.6",
    "react-dom": "^16.8.6"
  }
}
```

启动页面

```shell
npm run start
```



#### 配置css

----

1、安装依赖

> css-loader 用于解析css路径
>
> style-loader 用于将css加载进dom中

```shell
npm i css-loader style-loader -D
```

2、css模块化

```javascript
...
module.exports = {
  module: {
    rules: [
      ...
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  },
  ...
};
```

