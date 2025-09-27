const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(()=>{
    console.log("Connection SuccessFull");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

 
let manyChats = [
    {
    from : "anup",
    to : "mohit",
    massage : "what's going on",
    create_at : new Date()
},
{
    from : "aman",
    to : "mohit",
    massage : "what are you doint",
    create_at : new Date()
},
{
    from : "summit",
    to : "sudheer",
    massage : "you are right",
    create_at : new Date()
},
{
    from : "shailesh",
    to : "rohan",
    massage : "are you fine right",
    create_at : new Date()
},
{
    from : "amit",
    to : "surendra",
    massage : "what's going on",
    create_at : new Date()
},
{
    from : "rahul",
    to : "rakesh",
    massage : "How are you brother",
    create_at : new Date()
}
];

Chat.insertMany(manyChats);