# WebRTC
基于WebRTC的简单网页聊天示例

在客服端nodejs运行WebRTCServer.js作为信令服务器，在局域网内的设备用Chrome浏览器访问“服务器IP:3002"即可进行视频通话。
仅有部分浏览器支持WebRTC。

# use
## 安装依赖
```
apt-get install nodejs
apt-get install npm
```
## 配置环境
```
npm install --save body-parser
npm install --save express
```
## start
```
nodejs WebRTCServer.js
```

> 因为安全性原因chrome禁止的WebRTC服务，解决方法，Chrome地址栏输入`chrome://flags/#unsafely-treat-insecure-origin-as-secure`，写入网页地址、并设置为Enable。