/*Core modules */
const path = require('path'); //Inorder to go to public folder from server to access files, we can not use the below style of giving path console.log(__dirname+'/../public');//result:D:\Beyond\nodejs\project\udemy\node-chat-app\server\..\public. So we are entering server then getting out of it , to solve this issue, we'll use 'path' to go from project to public. https://nodejs.org/docs/latest-v7.x/api/path.html#path_path_join_paths
const fs = require('fs');
const http = require('http');

/*node installed modules */
const express = require('express');
const socketIO = require('socket.io');

/*custom modules */
// non till now

const publicPath = path.join(__dirname, '../public');//console.log(publicPath);//result: D:\Beyond\nodejs\project\udemy\node-chat-app\public
const port = process.env.PORT || 3000; // process.env.PORT used for port from heroku

let app = express();//the express internally uses the http.createServer. In order to work with websockets/socket.io, we'll need to use http server
let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
    console.log("New user connected");

    socket.emit('newEmail', {
        from: "abc.example.com",
        text: "Hello From Server",
        createdAt: 123
    });
    socket.on('createEmail', (createEmail) => {
        console.log("created email from client: ", createEmail);
    });

    socket.emit('newMessage', {
        from: "Someone",
        text: "This is a new msg from server :)",
        createdAt:123
    });
    socket.on('createMessage', (createdMessage) => {
        console.log("Message received from client ", createdMessage)
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

