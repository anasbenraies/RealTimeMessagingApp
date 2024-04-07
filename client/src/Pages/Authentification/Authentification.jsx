import React from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useState } from 'react'
import { useDispatch } from "react-redux"
import { setCurrentUser } from '../../features/User'
import "./Auth.css"
import {useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Authentification = ({socket}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate=useNavigate()

   
    const Submit = async () => {
        try {
            const res = await fetch("http://localhost:8000/users/login", {
                method: "POST", body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    "Content-Type": "application/json"
                }

            })
            const data = await res.json()
            //check wether to redirect to the next screen and set the global variable " current user "
            if (res.status === 200 && data) {
                //alert(data)
                dispatch(setCurrentUser(data))
                localStorage.setItem('currentUser', JSON.stringify(data));
                //Register the user as a connected user in the backend
                socket.emit("RegisterEmail",data.email)
                navigate(`/Messages/${data.id}`)
                
                
            }
            console.log(data)
        } catch (err) {
            console.log("erreur : " + err)
        }

    }

    return (
        <div className='auth'>
            <h2 className='Title'>Login to your account and Start Chatting !</h2>
            <Segment color="gray" >
                <Form >
                    <Form.Group widths='equal'>
                        <Form.Input onChange={(e) => setEmail(e.target.value)} fluid label='Email' placeholder='Email' />
                        <Form.Input onChange={(e) => setPassword(e.target.value)} fluid label='Password' placeholder='Password' />
                    </Form.Group>
                    <Form.Checkbox label='I agree to the Terms and Conditions' />
                    <Button type='submit' inverted color='green' onClick={Submit}>Submit</Button>
                </Form>
            </Segment>
        </div>
    )
}
export default Authentification
