const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        min: 7
    },
    password: {
        type: String,
        required: true,
        max: 1024
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friend'  // Reference the 'Friend' model
    }],
    keys:{
        publicKey:{
            type:String,
            default: ''
        },
        privateKey:{
            type:String,
            default: ''
        }
    
    }
});

module.exports = mongoose.model("User", UserSchema);
