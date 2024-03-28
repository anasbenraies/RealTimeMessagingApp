import React from 'react'
import FriendCard from './FriendCard'
import { useSelector,useDispatch } from 'react-redux'
import { Grid, Button } from 'semantic-ui-react'
import Message from './Message'
import {useState} from "react"
import {addMessage} from "../features/User"
import {Enc_Message_PublicKey} from "../Conf/encryption"


export default function FreindCollection({socket}) {
    const dispatch=useDispatch()
    const currentUser = useSelector((state) => state.vars.currentUser)
    const currentfriend = useSelector((state) => state.vars.currentFriend)
    const Discussion = useSelector((state)=>state.vars.Messages)
    const [content,setContent] = useState("")
    const box = {
        backgroundColor: "#ffffff", /* White background */
        padding: "20px",
        borderRadius: "10px", /* Rounded corners */
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", /* Subtle shadow */
        textAlign: "center",
        maxWidth: "80%" /* Adjust the max-width as needed */,
        marginTop: "3%",
        marginLeft: "5%"
    }
    const input = {

        width: "100%",
        padding: "13px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "16px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
         /* Shadow effect */
    }

    const handleSend=async(content)=>{
        //create the message object
        let encryptedMessage = {from:{},to:{},message:Enc_Message_PublicKey(content,currentfriend.publicKey)}
        let message = {from:{},to:{},Content:content}
        //let message ={from:{},to:{},Content:content}
        encryptedMessage.from.username=currentUser.username
        encryptedMessage.from.email=currentUser.email
        encryptedMessage.to.username = currentfriend.username
        encryptedMessage.to.email = currentfriend.email

        message.from.username=currentUser.username
        message.from.email=currentUser.email
        message.to.username = currentfriend.username
        message.to.email = currentfriend.email
        console.log(encryptedMessage)
        //add the message to the discussion for the current user
        dispatch(addMessage(message))
        //add message to database 
        const res = await fetch("http://localhost:8000/users/addmessage",{method:"POST",body:JSON.stringify(encryptedMessage),headers:{"Content-Type":"application/json"}})
        // const data = await res.json()
        //add message as real time for the other User 
        socket.emit("SendingMessage",encryptedMessage)
        //recieve the message from the other user if this is the case 
        socket.on("SendMessage",(encryptedMessage)=>{
            //set the message to the discussion for the current friend only if the message is for the current friend
            if(encryptedMessage.from.email===currentfriend.email){
            //decrypt the message here
            //...

            dispatch(addMessage(message))
            }
        })
    }



    return (
        // <div>FreindCollection</div>

        currentUser &&
        <Grid doubling columns={2}>
            
                <Grid.Column width={6}>
                    <div style={{ display: 'flex', flexDirection: "column", paddingLeft: "19%", paddingTop: "3%" }}>

                        {currentUser.friends.map((friend) => <FriendCard friend={friend} />)}

                    </div>
                </Grid.Column>
                <Grid.Column width={10}>
                    <div style={box}>
                        <h3>Messages</h3>
                        {Discussion.map((message)=><Message message={message}/>)}
                        <div style={{ display: "flex", justifyContent:"space-around",paddingTop:"2%"}}>
                            <input style={input} type="text" placeholder='Send Messages' onChange={(e)=>setContent(e.target.value)}></input>
                            <Button inverted color='green' onClick={()=>handleSend(content)}> Send  </Button>
                        </div>
                    </div>
                </Grid.Column>
            
        </Grid>
    )
}
