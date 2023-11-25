const {server,io,app,express}=require("./WebSockets/MainSocket")
const {isConnected, Connection} =require("./Conf/DBconfig")
const cors = require("cors")
const {UserRoute} =require("./Routes/User")

//database connection 
Connection()
isConnected()

//Middleware for External Connection
app.use(cors())
app.use(express.json())



io.on('connection', (socket) => {
    // socket.on('disconnect', () => {
    //     console.log('A user disconnected from the backend WebSocket server');
    //     const newArray = ActiveUsers.filter(item => item !== currentUser)
    //     ActiveUsers=newArray
    //     });
});

//setting the users route
app.use("/users",UserRoute)


const PORT = 8000 || process.env.PORT;
server.listen(PORT, () => {
    console.log(`Backend WebSocket server is running on port ${PORT}`);
});
