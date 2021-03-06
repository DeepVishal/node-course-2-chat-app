/*Core modules */
const path = require('path'); //Inorder to go to public folder from server to access files, we can not use the below style of giving path console.log(__dirname+'/../public');//result:D:\Beyond\nodejs\project\udemy\node-chat-app\server\..\public. So we are entering server then getting out of it , to solve this issue, we'll use 'path' to go from project to public. https://nodejs.org/docs/latest-v7.x/api/path.html#path_path_join_paths
const fs = require('fs');
const http = require('http');

/*node installed modules */
const express = require('express');
const socketIO = require('socket.io');

/*custom modules */
const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');//console.log(publicPath);//result: D:\Beyond\nodejs\project\udemy\node-chat-app\public
const port = process.env.PORT || 3000; // process.env.PORT used for port from heroku

let app = express();//the express internally uses the http.createServer. In order to work with websockets/socket.io, we'll need to use http server
let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
    console.log("New user connected");

    socket.emit('newMessage', generateMessage("Admin", "Welcome to chat app"));

    socket.broadcast.emit('newMessage', generateMessage("Admin", "New user joined"));

    socket.on('createMessage', (createdMessage,callback) => {
        io.emit('newMessage', generateMessage(createdMessage.from, createdMessage.text));
        // socket.broadcast.emit('newMessage', {
        //     from: createdMessage.from,
        //     text: createdMessage.text,
        //     createdAt: new Date().getTime()
        // });
        callback('This message is from server');
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected!!');
    })
});
//logging to server
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} : ${req.url}`;
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to write to file!');
        }
    });
    next();
});

app.use(express.static(publicPath));

server.listen(port, () => {//app.listen changed to server
    console.log(`Server up and running at ${port}`);
});

