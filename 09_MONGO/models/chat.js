const mongoose = require("mongoose");

const chatSchema =new mongoose.Schema({
    from : {
        type : String,
    },
    to : {
        type : String,
    },
    massage : {
        type : String,
        maxLenght : 50,
    },
    create_at : {
        type : String,
    }
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;

