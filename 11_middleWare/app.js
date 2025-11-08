const express = require("express");
const app = express();

//middleware ->response send
// app.use(middleware)//app.use(function)
app.use((req, res, next)=>{
    // let {query} = req.query;
    // console.log(query);
    console.log("Hi, I'm 1st middleware");
    res.send("middleware Done")
    next();
    console.log("middleware 1st after ")
})
app.use((req, res, next)=>{
    console.log("I'm 2nd middleware");
    return next()
})

//SIMPLE Route
app.get("/",(req, res)=>{
    res.send("Root route");

})

//random page
app.get("/random", (req, res)=>{
    res.send("Random message")
})
 
//start server
app.listen(8080,()=>{
    console.log("Your server is runing on PORT : 8080");
})