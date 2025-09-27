const express = require("express");
const app = express();
const path = require("path");
const Chat = require("./models/chat");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/chats", (req, res)=>{
        let totalChat = Chat.find();
        console.log(totalChat);
        res.send("chat port is working");
         
});
app.get("/", (req, res)=>{
    res.send("Port is working");
})
app.listen(8080, ()=>{
    console.log("Port is running on 8080 port");
});
