const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
    from: {
        email:{
            type: String,
            required: true,
            min: 6
        },
        username:{
            type: String,
            required: true,  
        }
        
    },
    to: {
        email:{
            type: String,
            required: true,
            min: 6
        },
        username:{
            type: String,
            required: true,  
        }
    },
    Content: {
        type: String,
        required: true,
        max: 2000
    },
    Date:{
        type: Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("Message", MessageSchema);
