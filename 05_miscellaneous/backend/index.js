// const express = require("express")
// const app = express();
// let port = 2000;
// app.get("/register",(req, res)=>{
//     res.send("stander GET requist")
// })
// app.post("/register", (req, res)=>{
//     res.send("standard POST requist")
// })
// app.listen(port, ()=>{
//     console.log(`port is working on  ${port}`);
// })

const express = require("express");
const cors = require("cors"); // <-- add this
const app = express();
let port = 2000;
//middleware
app.use(express.urlencoded({extended : true}))
app.use(express.json());
app.use(cors()); // <-- add this

app.get("/register", (req, res) => {
    let {user, password} = req.query;
    res.send(`standard POST requist, WELCOME${user}`);
});
app.post("/register", (req, res) => {
    console.log("values: ", req.body);
    let {user, password} = req.body;
    res.send(`standard POST requist ${user}`);
});
//start server
app.listen(port, "0.0.0.0", () => {
    console.log(`port is working on  ${port}`);
});




