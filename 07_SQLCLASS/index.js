const express = require("express");
const app = express();
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const path = require("path");
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
app.listen("2000",()=>{
    console.log("app is listen on port 2000");
})
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
app.get("/user",(req, res)=>{
    let q = `SELECT * FROM user`;
        connection.query(q, (err, result)=>{

            if(err)return res.status(500).send("Database error");   
            let data = result; 
            console.log(data);
        });
})