// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/bower_components'));
app.get('/', function(req, res,next) {
  res.sendFile(__dirname + '/index.html');
});

console.log("running");

io.on('connection', function(client) {
  console.log('Client connected...');

  client.on('join', function(data) {
    console.log(data);
    client.emit('step', 'Hello from server');
  });

  client.on('step', function(data) {
    console.log(data);
    client.emit('step', data);
    client.broadcast.emit('step',data);
  });

});

server.listen(3000);