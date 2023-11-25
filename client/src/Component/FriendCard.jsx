import React from 'react'
import { useDispatch,useSelector } from "react-redux"
import { setCurrentFriend, setMessages } from "../features/User"
import { Button, Card, Image } from 'semantic-ui-react'

export default function FriendCard({ friend }) {
  const currentUser=useSelector((state)=>state.vars.currentUser)
  const dispatch = useDispatch()

  
  const handleClick = async() => {
    dispatch(setCurrentFriend(friend))
    //when clicking of a friend set the current friend and fetch the messages for that friend
     const res= await fetch(`http://127.0.0.1:8000/users/getmessages/?friendEmail=${friend.email}&currentEmail=${currentUser.email}`,{method:"GET"
     })
     const data =await res.json()
  
     dispatch(setMessages(data))

     //console.log(data)
  }


  return (
    <div style={{padding:"1%"}}>
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='/images/avatar/large/steve.jpg'
          />
          <Card.Header>{friend.username}</Card.Header>
          <Card.Meta>{friend.email}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <div onClick={handleClick} className='ui two buttons'>
            <Button inverted color='green'>
              Contact me 
            </Button>
            
          </div>
        </Card.Content>
      </Card>
    </div>

  )
}
