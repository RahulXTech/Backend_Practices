// getting-started.js
const mongoose = require('mongoose');

main()
.then(()=>{
    console.log("success fully working")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

}
const userSchema = new mongoose.Schema({
  name : String,
  email : String,
  age : Number
});

// const User = mongoose.model("User", userSchema);
// User.find({age : {$gte : 22}}).then((res)=>{
//   console.log(res)
//   // console.log(res[0].email)//you can show only one indivisual info.
// })


const User = mongoose.model("User", userSchema);
User.find().then((res)=>{
  console.log(res)
  // console.log(res[0].email)//you can show only one indivisual info.
})





//========single data inserting one =============
// const user1 = new User({
//   name : "rahu",
//   email : "rahul@gmail.com",
//   age : 22
// });

// user1.save()
// .then((res)=>{
//   console.log(res);
// })
// .catch((err)=>{
//   console.log(err)
// })

//=============Inserting Multiple data==============
// User.insertMany([
//   {name : "roy", email : "roy@gmail.com", age : 21},
//   {name : "mohit", email : "mohit@gmail.com", age : 22},
//   {name : "anup", email : "anup@gmail.com", age : 24},
//   {name : "anuj", email : "anum@gmail.com", age : 20},
//   {name : "ropesh", email : "ropesh@gmail.com", age : 41},
//   {name : "ankit", email : "ankit@gmail.com", age : 11}
// ])
// .then((result)=>{
//   console.log(result);
// }).catch((err)=>{
//   console.log(err)
// });