var socket = io.connect('http://localhost:8080');
$(function(){ // funcion para crear sala
		
		$('#datasend').click( function() {
			var nombresala = $('#data').val();
			$('#data').val('');
			
			socket.emit('crearsala', nombresala);
		});
		
	});

$(function(){ // funcion para crear user
			$('#datasenduser').click( function() {
			var nombredeusuario = $('#datauser').val();
			$('#datauser').val('');
			socket.emit('crearusuario', nombredeusuario);
			
    		$("#inputusuario").hide('slow');
    		
			
		});
		
	});

socket.on('dibujarsalas',function(rooms){

		$('#rooms').empty();
		for(var i=0;i<rooms.length;i++){
			$('#rooms').append(' <a href="'+rooms[i]+'"><div id="salika" onClick="divFunction()" >' + rooms[i] + '</div><a/>');

		}

});



var divFunction = function(){
	var thisRoom = $("#salika").html(); // cojo el valor del div salika ( nombre de la room )
	console.log(thisRoom);
	socket.emit('unionasala',thisRoom);
}

// sala.html

$(function(){ // enviar mensaje
		
		$('#textsend').click( function() {
			var message = $('#message').val();
			$('#message').val('');
			console.log(socket.username);
			socket.emit('sendchat', message,socket.username);
		});

		
		$('#textsend').keypress(function(e) {
			if(e.which == 13) {
				$(this).blur();
				$('#textsend').focus().click();
			}
		});


	});

	socket.on('updatechat',function(username,message){
		console.log("ola");
		$('#chat').append('<b>'+username + ':</b> ' + message + '<br>');

	});
