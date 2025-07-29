const express = require("express");
const app = express();
let port = 4000;

app.listen(port, () => {
    console.log(`your app is listening on port ${port}`);
});

app.get("/", (req, res) => {
    console.log("hello i am root");
    res.send("Hello from root!");
});

app.get("/:username/:id", (req, res) => {
    let { username } = req.params;
    let htmlstr = `<h1>welcome @ ${username}</h1>`;
    res.send(htmlstr);
    console.log("your path is working");
});

//Topic query string
// https://www.facebook.com/search/top/?q=microsoft
// q=microsoft - This is the query string in url

app.get("/search", (req, res)=>{
    // console.log(req.query);
    let {q} = req.query;
    if(!q){
        res.send("Nothing search!!!!!!!!");
    }
    res.send(`search resule is ${q}`);
})
// searching technique - http://localhost:4000/search/?q="apple"&color=red