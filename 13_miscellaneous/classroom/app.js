const express = require("express");
const app = express();
const users = require("./routes/user")
const posts = require("./routes/post")

app.get("/", (req, res)=>{
    res.send("Hey, I'm root");
});

app.use("/user", users);
app.use("/post", posts);

app.listen(2000,()=>{
    console.log("Server runing on port : ",2000);
});




