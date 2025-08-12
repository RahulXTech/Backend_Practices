const express = require("express");
const app = express();
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const path = require("path");
const { Console } = require("console");
const methodOverride = require('method-override');
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "views"));
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sql@6825',
    database: 'student'
  });

  let getUser = ()=>{
    return[
        faker.string.uuid(),
        faker.internet.username(), 
         faker.internet.email(),
        faker.internet.password(),
    ]
};

let q = `SELECT COUNT(*) FROM users;`
app.get("/", (req, res)=>{
    try{
        connection.query(q, (err, result)=>{
            if(err){
                throw err;
            }
            console.log(result);
            let count = result[0]['COUNT(*)'];
            res.render("home.ejs", {count});
        });
    }catch(err){
        console.log(err);
    }
})
app.get("/users", (req, res) => {
    let q = `SELECT * FROM users`;
    connection.query(q, (err, result) => {
        if (err) return res.status(500).send("Database error is going on");
        res.render("user.ejs", { result });
    }); 
});

app.get("/user/:id/edit",(req,res)=>{
    let {id} = req.params;
    let q = `SELECT * FROM users WHERE id='${id}'`;
    connection.query(q, (err, result) => {
        if (err) return res.status(500).send("Database error is going on edit");
        console.log(result);
        let user = result[0];
        res.render("edit.ejs", {user});
    }); 

})

//update route
app.patch("/user/:id", (req, res)=> {
    let {id} = req.params;
    let q = `SELECT * FROM users WHERE id='${id}'`;
    let {password : formPass, username : newUsername} = req.body;

    connection.query(q, (err, result) => {
        if (err) return res.status(500).send("Database error is going on");
        let user = result[0];
        if(formPass != user.password){
            res.send("wront password")
        }else{
            let q2 = `UPDATE users SET username='${newUsername}' WHERE id='${id}'`;
            connection.query(q2, (err, result)=>{
                if(err) return res.status(500).send("update database is not working");
                res.send(result);
            })
        }
    }); 
});

app.listen("2000",()=>{
    console.log("app is listen on port 2000");
})

