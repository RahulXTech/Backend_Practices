const { model } = require("mongoose");
const Listing = require("../models/listing")

module.exports.index =  async (req, res) => {
  try {
    const allListing = await Listing.find({});
    res.render("listings/index", {title: "All All Listings", allListing });
  } catch (err) {
    console.error("❌ Error fetching listings:", err);
    res.status(500).send("Error fetching listings");
  } 
}

module.exports.newRoute = (req, res) => {
  res.render("listings/new" , {title: "All All Listings"});
};

module.exports.showRoute = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
  .populate({
    path: "reviews",
    populate:{ 
      path : "author",
    }
  })
    .populate("owner");

  if(!listing){
    req.flash("error", "listing you requested for does not exist!");
    return res.redirect("/listing");
  }
  console.log(listing);
  res.render("listings/show", { listing, title:"Show listing" });
};

module.exports.createRoute = async(req, res) => {
    const newListing = new Listing(req.body.listing);
     newListing.owner = req.user._id; 
    await newListing.save();
    req.flash("success", "New listing created!")
    res.redirect("/listing");  
}

module.exports.editRoute = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error", "listing you requested for does not exist!");
    return res.redirect("/listing");
  }
  res.render("listings/edit", { listing, title : "All listing" });
};

module.exports.updateRoute = async (req, res) => {
  let { id } = req.params;

   // find the listing
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listing");
  }

  // Ensure req.user exists (isLoggedIn should provide it) and check ownership
  const userId = req.user && req.user._id;
  if (!userId) {
    req.flash("error", "You must be logged in to do that.");
    return res.redirect("/login");
  }
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "listing updated!!")
  res.redirect(`/listing/${id}`);
};

module.exports.deleteRoute = async (req, res) => {
  let { id } = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  req.flash("success", "Listing deleted!!!!!!");
  res.redirect("/listing");
};