var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  ,	path = require("path")
  , io = require('socket.io').listen(server);

server.listen(8080);

// rutas
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/Inicio.html');
});
app.get('/'+':sala', function (req, res) {
  res.sendFile(__dirname + '/public/sala.html');
});

app.use(express.static(path.join(__dirname, 'public')));

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

	socket.on('sendchat',function(message){
		var usu = socket.username;
		console.log(message);
		io.sockets.in(socket.room).emit('updatechat', socket.username, message);
	})
	
	
});
