import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser, setCurrentFriend, setListOfFriends } from "./features/User"
import Authentification from './Pages/Authentification/Authentification';
import Messaging from './Pages/Messaging/Messaging';
import {io} from "socket.io-client"
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
  const [socket, setsocket] = useState(io("http://localhost:8000"))
  const dispatch = useDispatch()



  const handleClick = (data) => {
    socket.emit("Send Message", { to: data.to, Content: data.Content })
  }

  const Connect = async (username) => {
    
    const socket = io("127.0.0.1:8000")
    setsocket(socket)
    socket.emit("connection")
    socket.emit("SaveUsername", username)
    //fetching current user
    const res = await fetch(`http://localhost:8000/users/userinfo/?username=${username}`)
    const data = await res.json()
    console.log(data)
    dispatch(setCurrentUser({ username: data.username, email: data.email }))
    dispatch(setListOfFriends(data.friends))
    socket.on("welcome", (data) => {
      
    })
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="Login" element={<Authentification  socket={socket}/>} />
        <Route path="Messages/:id" element={<Messaging socket={socket}/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
