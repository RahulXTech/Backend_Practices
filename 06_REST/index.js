const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({extended : true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
let port = 2000;

let posts = [
    {
    username : "rahul",
    contant : " i love coading"
    },
    {
    username : "mohit",
    contant : " hard work is key to success"
    },
    {
    username : "amit",
    contant : "think big dream"
    },
    {
    username : "rohan",
    contant : "do hardwork everyday"
    },
];

app.get("/", (req, res)=>{
    res.send("serving working well!")
})
app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts})
})

app.listen(port, "0.0.0.0", ()=>{
    console.log(`successfully port is working on ${port}`)
})