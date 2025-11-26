const express = require("express");
const app = express();
const users = require("./routes/user")
const posts = require("./routes/post")
const cookieParser = require("cookie-parser");


// app.use(cookieParser());
app.use(cookieParser("secretcode"));


//signed cookies - you can verify cookies modification.
app.get("/getsignedcookie", (req, res)=>{
    res.cookie("color", "red", {signed : true});
    res.send("Done!");
})
//verify signed cookies
app.get("/verify", (req, res)=>{
    res.send(req.signedCookies);
})

app.get("/getcookies",(req, res)=>{
    res.cookie("Greed", "Namaste");
    res.cookie("Origin", "India");
    res.send("We sent you cookies");
})

app.get("/greet", (req, res)=>{
    let {name = "anonymous"} = req.cookies;
    res.send(`!Hi  ${name}`);
})

app.get("/", (req, res)=>{
    console.dir(req.cookies);
    console.log(req.cookies);
    res.send("Hey, I'm root");
    
});

app.use("/user", users);
app.use("/post", posts);

app.listen(2000,()=>{
    console.log("Server runing on port : ",2000);
});