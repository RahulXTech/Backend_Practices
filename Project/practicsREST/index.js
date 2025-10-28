const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({extended: true})); 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let posts = [
  { id: 101, username: 'sara_rose', description: 'Golden hour at the beach — calm waves and warm light.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop' },
  { id: 102, username: 'dev_ram', description: 'Coffee & code. Debugging until sunrise.', image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=600&auto=format&fit=crop' },
  { id: 103, username: 'travelista', description: 'Cliffside trails with views that take your breath away.', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop' },
  { id: 104, username: 'karen.art', description: 'Acrylic experiments — texture study.', image: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=600&auto=format&fit=crop' },
  { id: 105, username: 'foodie_fab', description: 'Late night street-food stroll: flavours & neon lights.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop' },
  { id: 106, username: 'mountainman', description: 'Summit selfie after 12k steps. Worth every step!', image: 'https://images.unsplash.com/photo-1504439904031-93aed5b5b1f1?q=80&w=600&auto=format&fit=crop' },
  { id: 107, username: 'sunny_sky', description: 'Hiking under clear skies with friends.', image: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?q=80&w=600&auto=format&fit=crop' },
  { id: 108, username: 'nightowl', description: 'City lights and late-night thoughts.', image: 'https://images.unsplash.com/photo-1508923567004-3a6b8004f3d3?q=80&w=600&auto=format&fit=crop' },
  { id: 109, username: 'artsy_vibes', description: 'Sketching ideas in the coffee shop.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop' },
  { id: 110, username: 'wanderlust', description: 'Exploring hidden gems off the beaten path.', image: 'https://images.unsplash.com/photo-1517821364227-16f28f4fa58f?q=80&w=600&auto=format&fit=crop' }
];

     
app.get("/", (req,res)=>{
    res.send("server is working well!!!!");
})

app.get("/posts",(req, res)=>{
    res.render("index.ejs",{posts})
})

app.get("/edit",(req,res)=>{
    res.render("edit.ejs", {posts})
})

app.listen(8080, ()=>{
    console.log("Server on listening port on 8080");
})
