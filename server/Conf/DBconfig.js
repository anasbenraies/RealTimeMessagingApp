const mongoose = require("mongoose")
require('dotenv').config();

const Connection=()=>{
    const url=process.env.db_url
    mongoose.connect(url,
        {useNewUrlParser: true,
        useUnifiedTopology: true})
}

const isConnected=()=>{
    const db=mongoose.connection
    db.once("open",()=>{
        console.log("Connected to database !")
    })
    db.once("error",(error)=>{
        console.log(error)
    })
}

module.exports={
    Connection:Connection,
    isConnected:isConnected
}
