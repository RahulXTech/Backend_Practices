const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
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
let users = [];
for(let i = 1; i<=100; i++){
    users.push(getUser())
}
  let q = "INSERT INTO users (id, username, email, password)  VALUES ?"; //it is use for multiple user
try{
    connection.query(q, [users], (err, result)=>{
        if(err){
            throw err;
        }
        console.log(result);
    });
}catch(err){
    console.log(err);
}
connection.end();


