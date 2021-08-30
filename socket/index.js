const io = require('socket.io')(8800,{
    cors : {
        origin : "http://localhost:8080"
    }
});

let users = [];

const addUser = (userId,socketId) => {
    if(!users.some((user) => user.userId === userId)){
        users.push({userId, socketId})
    }
    
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

io.on('connection', (socket) => {
    console.log('user conn');
    socket.on('addUser', userId => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    })

    //sendMessage

    socket.on('sendMessage', ({senderId, receivedId, text}) => {
        const user = getUser(receivedId);
        console.log('user', user);
        io.to(user.socketId).emit('getMessage', {
            senderId,
            text
        })
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    })
})