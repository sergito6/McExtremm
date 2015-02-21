var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  ,	path = require("path")
  , io = require('socket.io').listen(server);


server.listen(8080);
app.use(express.static(__dirname + '/public'));
// rutas
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/Inicio.html');
});
app.get('/'+':sala', function (req, res) {
  res.sendFile(__dirname + '/public/sala.html');
});


var usernames = {};

var rooms = [];

io.sockets.on('connection', function (socket) {
	socket.emit('dibujarsalas',rooms);

	socket.on('crearsala',function(nombresala){
		rooms.push(nombresala);
		socket.room = nombresala;
		console.log(rooms);
		socket.emit('dibujarsalas',rooms);


	});

	socket.on('crearusuario', function(nombreusuario){
		usernames[nombreusuario] = nombreusuario;
		socket.username = nombreusuario;
		console.log("usuario creado: " +nombreusuario);
	})
			

	socket.on('unionasala', function(nuevasala){
		socket.join(nuevasala);
		socket.room = nuevasala;
		console.log("el usuario "+socket.username +" se ha movido a la sala "+ nuevasala);
	})

	socket.on('sendchat',function(message,username){
		var usu = username;
		console.log("el Mensaje "+ message +"ha sido enviado por "+usu);
		io.sockets.in(socket.room).emit('updatechat', usu, message);
	})
	
	
});
