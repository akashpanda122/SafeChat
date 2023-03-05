const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'SafeChat Bot';


//Client Connects
io.on('connection', socket => {

    socket.on('joinRoom', ({username, room}) => {

        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        socket.emit('message', formatMessage(botName, 'Welcome to ChatChord!'));

        //Broadcast when user connects
        socket.broadcast.to(user.room).emit(
            'message', 
            formatMessage(botName, 'A user has joined the chat')
        );
    });

    //Listen chatMessage
    socket.on('message', msg => {
        io.emit('message', formatMessage('USER', msg));
    });

    //When client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has left the chat'));
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log('Server running on port 3000'));