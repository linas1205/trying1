var expres = require('express');
var app      = expres();
//var http = require('http').Server(app);


app.use(expres.static(__dirname + '/public'));

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var server = app.listen(port,ip);
var io = require('socket.io').listen(server);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
	console.log('io.connection');
  socket.on('chat message', function(msg){
    console.log(msg);
	io.emit('chat message', msg);
  });
});



