const express = require('express');
const app = express();
const port = 9000
const http = require('http')
const server = http.Server(app)
const io = require('socket.io')(server)

app.use(express.static('public'));

app.set('view engine', 'pug');
app.use(express.static('views'));

app.get('/', (req, res) => {
    res.render('index')
})

io.on('connection', (socket) => {
    console.log('Client', socket.id, 'is connected via WebSockets');
})

server.listen(port, () => {
    console.log(`server is running on port ${port}` );
})