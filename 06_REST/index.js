const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');


app.use(express.urlencoded({extended : true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
let port = 2000;
let posts = [
    {
    id : uuidv4(),
    username : "rahul",
    contant : " i love coading"
    },
    {
    id : uuidv4(),
    username : "mohit",
    contant : " hard work is key to success"
    },
    {
    id : uuidv4(),
    username : "amit",
    contant : "think big dream"
    },
    {
    id : uuidv4(),
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
app.get("/posts/new", (req, res)=>{
    console.log("New post working"); 
    res.render("new.ejs")
})
app.post("/posts", (req, res)=>{
    console.log(req.body);
    let {username , contant} = req.body;
    let id = uuidv4();
    posts.push({id, username, contant});
    res.redirect("/posts")
})
app.get("/posts/:id", (req, res)=> {
    let {id} = req.params;
    let post =  posts.find((p)=>id === p.id);
    res.render("show.ejs", {post})
})
app.patch("/post/:id", (req, res)=>{
    let {id} = req.params;
    console.log(id)
    res.send("patch requist working") 
})
app.get("/post/:id/edit", (req, res)=>{
    // let {id } = req.params;
    // let post =  posts.find((p)=>id === p.id);
    res.render("edit.ejs", {post})
    console.log("edit page working")
})
app.listen(port, "0.0.0.0", ()=>{
    console.log(`successfully port is working on ${port}`)
})