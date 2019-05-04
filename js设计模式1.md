### 重学JS-理解原型

日常开发中，我们喜欢利用构造函数和原型模式的组合函数来构造我们的类

```javascript
function Person (name) {
    this.name = name
}
Person.prototype.sayName = function() {
    alert(this.name)
}
```

通过这样的方式，我们可以规避，“原型共享属性”的这个优点，为每个实例创建独有的属性

接着，我们试着实现一个简单的继承

```javascript
function Dad (name) {
    this.name = name
}
Dad.prototype.say = function (name) {
    alert(this.name)
}
function Son (name) {
    this.name = name
}
```

上述代码中，我们构造了一个父类和子类，接着，我们试试把父类的原型赋值给子类的原型

```javascript
Son.prototype = Dad.prototype
```

紧接着，我们尝试在子类中使用`say`方法

```javascript
var s1 = new Son('jack')
s1.say()
```

打印结果

![jack](https://s2.ax1x.com/2019/05/02/ENMNo6.png)

我还记得，我是一个初学者的时候，学习这一知识点存在几个困惑

- 为什么子类没有定义`say`方法，却可以使用`say`方法
- 为什么定义在父类`say`方法打印的是子类的`name`值

简单说下我的理解

1、为何子类没有定义`say`方法，却可以使用`say`方法？

从代码层面上，通过`Son.prototype = Dad.prototype`,父类的原型赋值给了子类的原型，让我们来看看前后它的原型发生了什么变化

![原型](https://s2.ax1x.com/2019/05/02/ENQlAP.png)

可以看到，赋值后，子类原型拥有了`say`方法，实际上，这么做吧，子类原型的指针已经指向了父类的原型，试试打印它的原型模板

```javascript
console.log(Son.prototype.constructor)
```

打印结果

![原型对象](https://s2.ax1x.com/2019/05/02/ENQd7q.png)

可以发现，原来子类原型对象根本就是被替换了嘛，自然而然，当子类实例去调用`say`方法的时候，根据原型链搜素时，自然能调用`say`方法

2、为什么定义在父类`say`方法打印的是子类的`name`值

有人看到`new`关键字和`this`就懵圈了，在思考二者是否隐藏着某种神秘复杂的关系，不，没有

先打印一句代码

```javascript
var s1 = new Son('jack')
console.log(s1)
```

打印结果



![new](https://s2.ax1x.com/2019/05/02/EN31tx.png)

噢，原来被`new`过的实例是一个对象？！你肯定不是第一天知道，反正我那会惊呆了!

`new`关键字来自JS之父对JSer的人文关怀！JS内部引擎在在检测到该关键词后，会自动帮我们创建一个临时对象，并将原型对象及相关数据，挂载到该临时对象上，返回给我们，具体原理可以参考我的[new关键字解析](<https://luojinxu520.github.io/2019/02/21/new%E5%85%B3%E9%94%AE%E5%AD%97%E8%A7%A3%E6%9E%90/#more>)

`this`指向的位置取决于其调用的位置，业界有一句流行的说法，“谁调用了它，它就执向谁”（大部分情况下适用）

我这么说有点抽象，举个例子

```javascript
function foo () {
    console.log(this.name)
}
var obj = {
    name:'jack',
    foo:foo
}
obj.foo()
```

谁调用了它？`obj`对象！OK,那么`name`属性就在它身上找，找到就打印出来，没有就报错！

上面的代码，看起来有点怪怪的，为什么？

前面我们提了`new`关键词给我们返回了一个对象，该对象上挂载了我们所需的原型和相关函数！

怎么看着，这个临时对象理解起来是不是就有点像`obj`对象代码的形式，所以`this`能打印对应的结果

在你不知道的javascript一书中，该this的指向规则，被称为**隐式绑定**，具体规则也可以参考我的[关于this的指向](<https://luojinxu520.github.io/2018/12/08/%E5%85%B3%E4%BA%8Ethis%E7%9A%84%E6%8C%87%E5%90%91/#more>)

