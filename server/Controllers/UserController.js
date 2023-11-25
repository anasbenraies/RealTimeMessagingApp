const User = require("../Models/User")
const Message = require("../Models/Message")


const login = async (req, res) => {
    //the url here is localhost:800/users/userinfo/?username=something
    const { email, password } = req.body;
    const ResultUser = await User.findOne({ email: email, password: password })
    if (!ResultUser){
        res.status(404).json("check email or password !")
    }else {
        const ResponseUser = { id: ResultUser?.id, username: ResultUser?.username, email: ResultUser?.email }
        const friendListPromises = ResultUser?.friends.map(async friend_id => {
            const friend = await User.findById(friend_id)
            return { username: friend?.username, email: friend?.email }
        });
        const friendList = await Promise.all(friendListPromises);
        ResponseUser.friends = friendList;

    res.send(ResponseUser)
    }
   
}


const getMessages = async (req, res) => {
    const { friendEmail, currentEmail } = req.query
    //from and to are both email
    const messages = await Message.find({
        $or: [{
            'from.email': friendEmail,
            'to.email': currentEmail
        }, {
            'from.email': currentEmail,
            'to.email': friendEmail
        }]
    }
    ).sort({ Date: 1 });
    res.status(200).send(messages)
}

const addMessage=async(req ,res)=>{
     const message = req.body 
     // must be a verification here with @hapyoi
     const NewMessage = new Message(message)
     try{
        await NewMessage.save()
     }catch(err){
            console.log(err)
     }
     res.status(200).send("message added")

}



module.exports = {
    login: login,
    getMessages: getMessages,
    addMessage:addMessage
}