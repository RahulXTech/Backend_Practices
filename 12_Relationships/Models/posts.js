
// getting-started.js
const mongoose = require('mongoose');
const {Schema} = mongoose;

main().then(()=> console.log("Connection successful")) .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


const userSchema = new Schema({
    username : String,
    email : String,
});
const postSchema = new Schema({
    contant : String,
    likes : Number,
    user: {
        type : Schema.Types.ObjectId,
        ref: "User"
    }
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// const addData = async()=>{
//     // let user1 = new User({
//     //     username : "Rahul kumar",
//     //     email : "rahul@gmail.com"
//     // });
//     let user1 = await User.findOne({username: 'Rahul kumar'});
//     let post2 = new Post({
//         contant : "Bye bye!",
//         likes : 10
//     });
//     post2.user = user1;

//     // await user1.save();
//     await post2.save();
// };

// addData();

const getData = async () =>{
    let result = await Post.findOne({}).populate("user", "username")
    console.log(result);
}
getData();

// ================6 Rule of thumb for mongodb schema design ==========================
// URL : -
// https://www.mongodb.com/company/blog/mongodb/6-rules-of-thumb-for-mongodb-schema-design?msockid=28344b8756f6660c16535df257d5674d


