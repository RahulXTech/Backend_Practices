const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync")
const ExpressError = require("./utils/ExpressError");
const { title } = require("process");
const MONGO_URL = "mongodb://localhost:27017/wanderlust";

main()
  .then(() => console.log("✅ Connected to DB"))
  .catch((err) => console.log("❌ DB Connection Error:", err));
 
async function main() {
  await mongoose.connect(MONGO_URL);
}

// ✅ Register ejs-mate first
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


// Serve static files (important for your /css/style.css)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  // res.send("Hi, I am root");
  res.render("listings/home", {title : "Home page"})
});

app.get("/listing", async (req, res) => {
  try {
    const allListing = await Listing.find({});
    res.render("listings/index", {title: "All All Listings", allListing });
  } catch (err) {
    console.error("❌ Error fetching listings:", err);
    res.status(500).send("Error fetching listings");
  }
});

// New route
app.get("/listing/new", (req, res) => {
  res.render("listings/new" , {title: "All All Listings"});
});

// Show route
app.get("/listing/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show", { listing, title:"Show listing" });
});
// Create route
app.post("/listings",wrapAsync( async(req, res) => {
  if(!req.body.listing){
    throw new ExpressError(400, "Send valid data for listing")
  }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");
  
}));

// Edit route
app.get("/listings/:id/edit", wrapAsync (async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", { listing, title : "All listing" });
}));

// Update route
app.put("/listings/:id", wrapAsync( async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listing/${id}`);
}));

// Delete route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  res.redirect("/listing");
}));

//It will send the custom massage for wrong all routes
app.use((req,res, next)=>{
  res.render("listings/pagenf", {title:"Show listing" });
  // next(new ExpressError(404, "Page Not found on this path"));
 
})

//err-handling middleware 
app.use((err, req, res, next)=>{
  const {statusCode=500, message="Something went wrong"} = err;
  res.render("listings/error.ejs");
  // res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("🚀 Server is listening on port 8080");
});