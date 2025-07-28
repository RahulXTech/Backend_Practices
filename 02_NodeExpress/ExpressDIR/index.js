// const express =  require("express");
// const app = express();
// let heading = "<h1>Wel-come to Express</h1>";
// // console.log(app);
// let port = 4000;
// app.listen(port, ()=>{
//     console.log(`app is listening on port ${port}`);
// })
// app.use((req, rec)=>{
//     // console.log(req);
//     rec.send(heading);
//     rec.send({
//         name : "orange",
//         color : "yellow"
//     });
//     console.log("requist received");
// });
const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
    console.log("You connected with root path");
    res.send("You connected with root path");
});

app.get("/home", (req, res) => {
    console.log("You connected with home page");
    res.send("You connected with home page");
});

app.get("/about", (req, res) => {
    console.log("You connected with about page section");
    res.send("You connected with about page section");
});

app.get("/help", (req, res) => {
    console.log("You connected with help page section");
    res.send("You connected with help page section");
});

// Wildcard route (404)
app.get("*", (req, res) => {
    console.log("This page does not exist");
    res.send("This page does not exist");
});

app.listen(port, () => {
    console.log(`Your app is listening on port ${port}`);
});