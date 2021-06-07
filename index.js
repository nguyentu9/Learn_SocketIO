const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(3000)
var sk = []
io.on('connection', function (socket) {
    console.log('Co nguoi ket noi: ' + socket.id)
    sk.push(socket.id)
    console.log(sk)
    socket.on('Client_send_data', function (data) {
        console.log(socket.id + ' da gui: ' + data)

        // Gửi cho tất cả client
        io.sockets.emit('Server_send_data', data + '888')

        // Gửi lại cho client vừa gửi lên
        socket.emit('Server_send_data', data + '888')

        // Gửi cho tất cả client ngoại trừ client vừa gửi lên
        socket.broadcast.emit('Server_send_data', data + '888')

        // Gửi cho client được chỉ định
        socket.to(`${sk[0]}`).emit('Server_send_data', data + '888')
    })
    socket.on('disconnect', function () {
        console.log(socket.id + ' da ngat ket noi!!!')
    })
})

app.get('/', function (req, res) {
    res.render('home')
})
