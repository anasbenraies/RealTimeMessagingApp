import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"user",
    initialState:{
        currentUser:{},
        ListOfFriends:[],
        Messages:[],
        currentFriend:{},
    },reducers:{
        addMessage:(state,action)=>{
            state.Messages=[...state.Messages,action.payload]
        },
        setListOfFriends:(state,action)=>{
            state.ListOfFriends=action.payload
        },
        setCurrentUser:(state,action)=>{
            Object.assign(state.currentUser, action.payload);
        },
        setMessages:(state,action)=>{
            state.Messages=action.payload
        },
        setSocket:(state,action)=>{
            state.socket=action.payload
        },
        setCurrentFriend:(state,action)=>{
            Object.assign(state.currentFriend, action.payload);
        },
        initializeFromLocalStorage(state) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      
            if (currentUser) {
              state.currentUser.id = currentUser.id;
              state.currentUser.username = currentUser.username;
              state.currentUser.email = currentUser.email;
              state.currentUser.friends = currentUser.friends;
            }
          }
    }
})


export const {initializeFromLocalStorage,setSocket,setCurrentFriend
    ,setCurrentUser,setMessages,setListOfFriends,addMessage} =userSlice.actions

export default userSlice.reducer