const ws = require('ws')
const server = new ws.Server({ port: '3000' })

server.on('connection', socket => {
    socket.on('message', message => {
        const b = Buffer.from(message)
        console.log(b.toString())
        socket.send(`${message}`)
    })
})