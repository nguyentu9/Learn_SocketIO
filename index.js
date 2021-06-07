const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(3000)

io.on('connection', function (socket) {
    console.log('Co nguoi ket noi: ' + socket.id)

    socket.on('Client_send_data', function ({ a, b }) {
        var sum = parseInt(a) + parseInt(b)
        socket.emit('Server_send_data', sum)
    })
    socket.on('disconnect', function () {
        console.log(socket.id + ' da ngat ket noi!!!')
    })
})

app.get('/', function (req, res) {
    res.render('home')
})
