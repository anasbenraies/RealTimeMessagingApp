const express = require('express');
const app = express();
const cors = require("cors")
const http = require('http');
const { Server } = require('socket.io')
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://127.0.0.1:3000","http://localhost:3000"], // Adjust with your frontend's URL
        methods: ["GET", "POST"]
    }
});

let ActiveUsers = []

const ExistUser = (username) => {
    for (let user of ActiveUsers){
        if (user[0]===username)
            return true
    }
    return false
}

io.on('connection', (socket) => {

    console.log('A user is connected');

    socket.on("RegisterEmail", (email) => {
        console.log("a user connected with a username :" + email)
        if (!ExistUser(email)) {
            const currentUser = [email, socket.id]
            ActiveUsers.push(currentUser)
            console.log(ActiveUsers)
        }
    })

    socket.on("SendingMessage", (message) => {
        ActiveUsers.forEach(user => {
            if (user[0] === message.to.email) {
                io.to(user[1]).emit("SendMessage", message)
            }
        })
    })
    socket.on('disconnect', () => {
         console.log('A user disconnected from the backend WebSocket server');
         ActiveUsers=ActiveUsers.filter((item)=>item[1]!==socket.id)
         console.log(ActiveUsers)
    });
});




module.exports={
    server:server,
    io:io,
    app:app,
    express:express
}


