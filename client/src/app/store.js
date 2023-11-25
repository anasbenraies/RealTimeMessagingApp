import {configureStore} from "@reduxjs/toolkit"
import UserReducer from "../features/User"


export default configureStore({
    reducer:{
        vars:UserReducer
    }
})    