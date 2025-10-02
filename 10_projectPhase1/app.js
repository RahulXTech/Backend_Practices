const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "";

async function main(){
    await mongoose.connect(MONGO_URL);
}
app.get("/", (req, res)=>{
    res.send("Hi, i am root")
});
app.listen(8080, ()=>{
    console.log("server is listening to prot 8080");
})
