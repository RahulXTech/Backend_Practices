const express = require("express")
const app = express();

let port = 2000;

app.get("/", (req, res)=>{
    console.log("you connected with root page ")
    res.send("You connected with root page")
})
app.get("/home", (req, res)=>{
    console.log("you connected with home page")
    res.send("You connected with home page")
})
app.get("/aobut", (req, res)=>{
    console.log("you connected with about page")
    res.send("You connected with about page")
})
// app.get("*", (req, res)=>{
//     console.log("page is not exist")
//     res.send("Page is not exist")
// })
app.listen(port, ()=>{
    console.log(`Your port is working on ${port}`);
});