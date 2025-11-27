const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose"); 
const { schema } = require("./review");
const { string, required } = require("joi");

const userSchema = new Schema({
    email: {
        type: String,   // <-- ONLY this fixed (String instead of string)
        required: true
    }
})

userSchema.plugin(passportLocalMongoose);  // <-- ONLY this fixed

module.exports = mongoose.model('User', userSchema);
