const express = require('express')
const app = express()
const http = require('http').createServer(app)
const say = require('say')

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

const users = {};

io.on('connection', (socket) => {
    socket.on('new-user-joined', name =>{
        console.log(name,'Connected...')
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
        say.speak(name +' joined the chat room');
    })
    
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
        let mssg= msg.message
        if (mssg[0] == '@') {
            
            console.log(mssg[0])
            let msssg = mssg.slice(1)
            console.log(msssg)
            // TextToSpeech.talk(msssg);
            say.speak(msssg);
        }
    })

    socket.on('disconnect', (msg) => {
        console.log(users[socket.id], 'Disconnected...')
        socket.broadcast.emit('left', users[socket.id])
        say.speak(users[socket.id] +' left the chat room');
        delete users[socket.id];
        
    })
})