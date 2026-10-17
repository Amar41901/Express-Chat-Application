const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const chatController = require('./controllers/chatController');

app.get('/', chatController.index);

// Socket.io for real-time communication
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg);  // Emit message with emoji to all users
    });

    socket.on('emojiMessage', (emoji) => {
        io.emit('emojiMessage', emoji);  // Emit emoji to all users
    });
});

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});

