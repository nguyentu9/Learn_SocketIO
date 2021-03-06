const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(3000)

io.on('connection', function (socket) {
    console.log('Co nguoi ket noi: ', socket.id)
    socket.on('demo', function (data) {
        console.log(data)
    })

    socket.on('disconnect', function () {
        console.log(socket.id + ' ngat ket noi!!!')
    })
})

app.get('/', function (req, res) {
    res.render('home')
})
