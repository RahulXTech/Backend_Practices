const express = require("express");
const app = express();
const path = require("path");
let port = 2000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public/css")))
app.use(express.static(path.join(__dirname, "public/js")))

app.get("/", (req, res)=>{
    res.render("home.ejs")
})
app.get("/hello", (req, res)=>{
    res.send("hello")
})
// app.listen(port, ()=>{
//     console.log("Your app is listening")
// })
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});
let dice = Math.floor(Math.random() * 6) + 1;
app.get("/random",(req, res)=>{
    res.render("rolldice.ejs", {dice})
})
//instagram EJS
app.get("/ig/:username", (req, res)=>{
    let {username} = req.params;
    const instagramData =  require("./data.json")
    const data = instagramData[username];
    console.log(instagramData);
    if(data){
        res.render("instagram.ejs", { data});
    }else{
        res.render("error.ejs")
    }
})


