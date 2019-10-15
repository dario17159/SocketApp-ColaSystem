var socket = io();

var label = $('#lblNuevoTicket')

socket.on('connect', function() {
    console.log('Conectado al Servidor');
})

socket.on('disconnect', function() {
    console.log('Se perdio la conexion del servidor');
})

socket.on('estadoActual', function(estado) {
    label.text(estado.actual)
})

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket)
    })
})