const express = require("express");
const app = express();
const path = require("path");
let port = 2000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res)=>{
    res.render("home.ejs")
})
app.get("/hello", (req, res)=>{
    res.send("hello")
})
app.listen(port, ()=>{
    console.log("Your app is listening")
})
let dice = Math.floor(Math.random() * 6) + 1;
app.get("/random",(req, res)=>{
    res.render("rolldice.ejs", {dice})
})
//instagram EJS
app.get("/ig/:username", (req, res)=>{
    const flowers = ["rahul", "Mohit", "summit", "ramesh", "aniket", "mukesh"];
    let {username } = req.params;
    let usernames = username;
    console.log(`Hello, ${username}`);

    res.render("instagram.ejs", { usernames, flowers})
})

