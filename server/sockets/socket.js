const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    console.log('Se conecto un cliente');

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente()
        callback(siguiente)
    })

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.getUltimosCuatro()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                message: ' El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio)

        callback(atenderTicket)

        client.broadcast.emit('estadoActual', {
            ultimosCuatro: ticketControl.getUltimosCuatro()
        })
    })
});