const mongoose = require('mongoose');

main()
.then(()=>{
    console.log("success fully working")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazone');
}
const bookSchema = new mongoose.Schema({
    title : {
        type :String,
        required : true,
    },
    author : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
    },
})
///This is the model
const Book = mongoose.model("Book", bookSchema);

const book1 = new Book({
    title : "Power of zero",
    author : "Verma",
    price : 210,
})
book1.save().then((res)=>{
    console.log(res)
}).catch(err=> console.log(err));