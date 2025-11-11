const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

//middleware ->response send
// app.use(middleware)//app.use(function)
// app.use((req, res, next)=>{
//     // let {query} = req.query;
//     // console.log(query);
//     console.log("Hi, I'm 1st middleware");
//     res.send("middleware Done")
//     next();
//     console.log("middleware 1st after ")
// })
// app.use((req, res, next)=>{
//     console.log("I'm 2nd middleware");
//     return next()
// })

// //utility middleware.
// app.use((req, res, next)=>{
//     console.log("I'm 3rd middleware");
//     console.log("Method : ",req.method, "\n")
//     console.log("Path : ", req.path, "\n")
//     console.log("responsetime : ", req.responsetime, "\n")
//     console.log("hostname : ",req.hostname, "\n")
// })



//SIMPLE Route
app.get("/",(req, res)=>{
    res.send("Root route");

})
//It will protect the api as a wall protector
let checkToken = (req, res, next)=>{
    let {token} = req.query;
    if(token === "giveaccess"){
        next()
    }
    throw new ExpressError(404,"ACCESS DENIED!");
}

//Activity to create self error
app.get("/admin", (req, res)=>{
    throw new ExpressError(403, "Access to admin is forbidden");
});

// app.get("/err", (req, res)=>{
//     apc == apc
// });
//Error Handling Middleware
app.use((err, req, res,next)=>{
    let {status=500, message="some Error Occurred"} = err;
    res.status(status).send(message)
});



app.get("/api", checkToken,(req, res)=>{
    res.send("data");
});

//random page
app.get("/random", (req, res)=>{
    res.send("Random message")
});

//start server
app.listen(8080,()=>{
    console.log("Your server is runing on PORT : 8080");
})
