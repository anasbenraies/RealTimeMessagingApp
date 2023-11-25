const mongoose = require("mongoose");

const FriendSchema = mongoose.Schema({
    friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // Reference the 'User' model
    }
});

module.exports = mongoose.model("Friend", FriendSchema);
