//Inorder to go to public folder from server to access files, 
//we can not use the below style of giving path
//console.log(__dirname+'/../public');//result:D:\Beyond\nodejs\project\udemy\node-chat-app\server\..\public
//So we are entering server then getting out of it , to solve this issue, we'll use 'path' to go from project to public
//https://nodejs.org/docs/latest-v7.x/api/path.html#path_path_join_paths

const path = require('path');
const express = require('express');
const fs = require('fs');
const publicPath = path.join(__dirname, '../public');
//console.log(publicPath);//result: D:\Beyond\nodejs\project\udemy\node-chat-app\public
const app = express();
const port = process.env.PORT || 3000; // process.env.PORT used for port from heroku

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

app.listen(port, () => {
    console.log(`Server up and running at ${port}`);
});

