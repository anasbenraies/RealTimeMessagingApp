import React from 'react'
import { useSelector } from 'react-redux'
import { Feed, Icon, Message } from 'semantic-ui-react'

export default function DialogBox() {
    const Messages = useSelector(state => state.vars.Messages)

    const dialogMessages = <Feed>
        <Feed.Event>
            <Feed.Label>
                <img src='/images/avatar/small/elliot.jpg' />
            </Feed.Label>
            <Feed.Content>
                <Feed.Summary>
                    <Feed.User>Elliot Fu</Feed.User> added you as a friend
                    <Feed.Date>1 Hour Ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                    {/* {Messages}. */}
                </Feed.Extra>
                <Feed.Meta>
                    <Feed.Like>
                        <Icon name='like' />4 Likes
                    </Feed.Like>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>
    </Feed>

    return (
         Messages.length>0?dialogMessages: null 
    )
}
