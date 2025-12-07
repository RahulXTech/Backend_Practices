const express = require("express");
const route = express.Router();
const wrapAsync = require("../utils/wrapAsync")
const ExpressError = require("../utils/ExpressError");
const {listingSchema, reviewSchema} = require("../schema");
const Listing = require("../models/listing");
const {isLoggedIn} = require("../middleWare.js");
const lisgingController = require("../controllers/listings.js")
const multer = require("multer");
const {storage} = require("../cloudeConfig.js")
const upload = multer({storage})
 

const validateListing = (req, res, next)=>{
    let {error} =  listingSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el)=> el.message).join(",");
      throw new ExpressError(400, errMsg);
  }else{
    next();
  }
};
//index route
route.get("/listing",lisgingController.index);

// New route
route.get("/listing/new",isLoggedIn, lisgingController.newRoute);

// Show route
route.get("/listing/:id", lisgingController.showRoute);

// Create route
route.post("/listings",
  upload.single('image'),
  validateListing,
   wrapAsync(lisgingController.createRoute));


// route.post("/listings", upload.single('listing[image][url]') ,(req, res)=>{
//   res.send(req.file);
//   console.log(req.file);
// })

// Edit route
route.get("/listings/:id/edit",isLoggedIn, wrapAsync (lisgingController.editRoute));

// Update route
route.put("/listings/:id",
  isLoggedIn, 
  upload.single('image'),
  wrapAsync(lisgingController.updateRoute));

// Delete route
route.delete("/listings/:id",isLoggedIn, wrapAsync(lisgingController.deleteRoute));
module.exports = route;