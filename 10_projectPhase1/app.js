const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");

const MONGO_URL = "mongodb://localhost:27017/wanderlust";

main()
  .then(() => console.log("✅ Connected to DB"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));


app.get("/", (req, res) => {
  res.send("Hi, I am root");
});
app.get("/listing", async (req, res) => {
  try {
    const allListing = await Listing.find({});
    res.render("listings/index", { allListing });
  } catch (err) {
    console.error("❌ Error fetching listings:", err);
    res.status(500).send("Error fetching listings");
  }
});

//show route.
app.get("/listing/:id", async(req,res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show", {listing})
})

app.listen(8080, () => {
  console.log("🚀 Server is listening on port 8080");
});