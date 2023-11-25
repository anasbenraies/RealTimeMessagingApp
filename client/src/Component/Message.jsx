import React from 'react'
import { useSelector } from 'react-redux'
import { Feed } from 'semantic-ui-react'

export default function Message({ message }) {
    const currentUser = useSelector((state) => state.vars.currentUser)
    return (
        <div>
            <Feed>
                <Feed.Event>
                    <Feed.Label image='/images/avatar/small/laura.jpg' />
                    <Feed.Content>
                        <Feed.Date>{message.Date}</Feed.Date>
                        
                            {message.from.email===currentUser.email?"You":message.from.username}
                        
                        <Feed.Extra text>
                           <strong> {message.Content}</strong>
                        </Feed.Extra>
                    </Feed.Content>
                </Feed.Event>
            </Feed>
        </div>
    )
}
