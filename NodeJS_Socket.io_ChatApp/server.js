const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./public/util/messages');
const userHandel = require('./public/util/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000 || process.env.PORT;
const botName = 'ChatCord Bot';

//set static folder
app.use(express.static(path.join(__dirname,'public')));

//run when the client connect
io.on('connection',(socket) =>{

    console.log('New web socket connection is intialized');

    socket.on('joinRoom',({username,room})=>{

        const user = userHandel.userJoin(socket.id,username,room);

        socket.join(user.room);

        //welcome message
        socket.emit('message',formatMessage.formatMessage(botName,'welcome to ChatCord!'));

        //Broadcast when a user connect
        socket.broadcast
                        .to(user.room)
                        .emit('message',formatMessage.formatMessage(botName,`${user.username} has joined to the chat`));

    });

    //listen for the chatMessage
    socket.on('chatMessage',(msg)=>{
        const user  = userHandel.getCurrentUser(socket.id);
        io.to(user.room).emit('message',formatMessage.formatMessage(user.username,msg));
    });

    //Runs when client disconnects
    socket.on('disconnect',()=>{
        const user = userHandel.userLeave(socket.id);

        if(user){
            io.to(user.room).emit('message',formatMessage.formatMessage(botName,`${user.username} has left the chat`));
        };
    });

});

server.listen(PORT, ()=>{
    console.log(`server is runing on the Post ${PORT}`);
})