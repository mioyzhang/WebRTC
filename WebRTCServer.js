// JavaScript Document
/*jshint node:true */
"use strict";

var express = require('express');
var app = express();
var server = require('http').createServer(app);

var url = require('url');
var WebSocket = require('ws');

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/chatpage.html');
});
server.listen(3002, function () {
    console.log('服务器开启：' + 3002);
});

var wss = new WebSocket.Server({
    server: server
});

function UserSession(){
    this.users = {};
}

UserSession.prototype.remove = function (name) {
    delete this.users[name];
};
UserSession.prototype.setUserInfo = function (name, info) {
    this.users[name] = info;
};
UserSession.prototype.getUserInfo = function (name) {
    return this.users[name];
};
UserSession.prototype.sendMsg = function (form, aims, msg) {
    var users = this.users;
    try {
        if (users[aims]) {
            users[aims].ws.send(JSON.stringify(msg));
        } else {
            if (msg.type == 'offer') {
                console.log('There is no user named ' + aims);
                users[form].ws.send(JSON.stringify({
                    type: 'error',
                    data: 'There is no user named ' + aims
                }))
            }
        }
    } catch (error) {
        console.log(error);
    }
};

var usersession = new UserSession();

wss.on('connection', function (ws, req) {
    const location = url.parse(req.url, true);
    const identify = location.search.split('?')[1];
    console.log(identify + '连接到服务器');
    usersession.setUserInfo(identify, {
        ws: ws,
        name: identify
    });
    // console.log(usersession);
    ws.on('message', function (msg) {
        var data = JSON.parse(msg);
        console.log('received '+ identify + ': ' + data.type + ' from ' + data.from + ' to ' + data.to);
        usersession.sendMsg(data.from, data.to, data);
    });
    ws.on('close', function () {
        console.log(identify + '断开连接');
        usersession.remove(identify);
    });
});

