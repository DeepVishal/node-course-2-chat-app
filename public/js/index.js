var socket = io();
socket.on('connect', function () {
    console.log("connected to server");
});
socket.on('disconnect', function () {
    console.log('Disconnected from server!');
});
socket.on('newMessage', function (newMessage) {
    console.log(newMessage);
})
socket.on('welcomeMessage', (welcomeMessage) => {
    console.log(welcomeMessage);
});
socket.on('newMember', (newMember) => {
    console.log(newMember);
})