const express = require("express")
const app = express();
const session = require("express-session")
const flash = require("connect-flash")

// Register a default namespace.
views.register(path.join(__dirname, 'views'));


const sessionOption = {
    secret : "mysupersecretstring",
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionOption));
app.use(flash())

app.get("/test", (req, res)=>{
    res.send("test successfull!");
});
app.get("/", (req, res)=>{
    res.send("test successfull!");
});

app.get("/register", (req, res)=>{
    let {name = "anonymos"} = req.query;
    req.session.name = name;
    req.flash("success", "user registered successfully!")
    res.redirect("/hello");
})

app.get("/hello",(req, res)=>{
    res.render("page.ejs")
    res.send(`hello, ${req.session.name}`);
})

// app.get("/reqcount", (req, res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`you sent a request ${req.session.count} times`)
// })

app.listen(3000, ()=>{
    console.log("server is listening to 3000");
});





