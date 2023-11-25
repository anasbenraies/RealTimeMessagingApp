const UserRoute =require("express").Router()
const {login,getMessages,addMessage} =require("../Controllers/UserController")



UserRoute.post("/login",login) 
UserRoute.get("/getmessages",getMessages)
UserRoute.post("/addmessage",addMessage)

module.exports={UserRoute:UserRoute}