const mongoose = require("mongoose");

const EncMessageSchema = mongoose.Schema({
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
    message:{
        EncContent: {
            type: String,
            required: true,
        },
        EncSecretKey:{
            type: String,
            required: true,
        },
    },
    Date:{
        type: Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("EncMessage", EncMessageSchema);
