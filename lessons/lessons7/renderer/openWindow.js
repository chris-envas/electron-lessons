// 渲染进程下的通信模块
const { ipcRenderer } = require('electron')

// 获取DOM
const sendNews = document.querySelector('.sendNews')

// 渲染进程向主进程发送信息
sendNews.addEventListener('click', function() {
    var news = Math.random();
    ipcRenderer.send('openWindow',news);
})

// 监听新页面传递回来的toIndex事件
ipcRenderer.on('toIndex', function(event,data) {
    alert('新页面传递过来的信息'+data)
})