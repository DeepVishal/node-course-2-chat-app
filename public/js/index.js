var socket = io();
socket.on('connect', function () {
    console.log("connected to server");
    socket.emit('createEmail', {
        to: "xyz@example.com",
        text: "Writting from client"
    });
    socket.emit('createMessage', {
        to:"Thatone",
        text: 'msg from client'
    })
});
socket.on('disconnect', function () {
    console.log('Disconnected from server!');
});
socket.on('newEmail', function (newEmail) {
    console.log("newEmail received", newEmail);
});
socket.on('newMessage', function (newMessage) {
    console.log(newMessage);
})