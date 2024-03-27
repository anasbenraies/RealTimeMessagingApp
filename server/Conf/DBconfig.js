const mongoose = require("mongoose")

const Connection=()=>{
    const url="mongodb+srv://anas:Boc999123@cluster.bam75o1.mongodb.net/"
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
