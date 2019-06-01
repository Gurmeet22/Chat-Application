const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection')
    socket.emit('message', 'Welcome!!')
    socket.broadcast.emit('message', 'A new user has connected')
    socket.on('sendMessage', (msg, callback) => {
        const filter = new Filter();
        if(filter.isProfane(msg)){
            msg = filter.clean(msg)
            callback('not allowed')
        }
        io.emit('message', msg)
        callback()
    })
    socket.on('sendLocation', ({latitude, longitude}, callback) => {
        io.emit('location', `https://google.com/maps?q=${latitude},${longitude}`)
        callback()
    })
    socket.on('disconnect', () => {
        io.emit('message', 'A user has disconnected')
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})