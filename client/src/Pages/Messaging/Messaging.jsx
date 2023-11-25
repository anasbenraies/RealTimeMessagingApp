import React from 'react'
import { useEffect } from 'react'
import FreindCollection from '../../Component/FreindCollection'
import { useSelector } from 'react-redux'


export default function Messaging({socket}) {
    const currentUser = useSelector((state) => state.vars.currentUser)
    useEffect(() => {
        socket.emit("RegisterEmail",currentUser.email)
    }, [])
    return (
        <div style={{display:"felx",justifyContent:"space-around"}}>
           
                <FreindCollection socket={socket}/>
                
        </div>
    )
}
