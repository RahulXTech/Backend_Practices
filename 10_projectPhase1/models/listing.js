const { types } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage"
    },
    url: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2022/10/07/10/51/the-glacier-7504780_1280.jpg",
      set: (v) =>
        v === ""
          ? "https://cdn.pixabay.com/photo/2022/10/07/10/51/the-glacier-7504780_1280.jpg"
          : v,
    }
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type : Schema.Types.ObjectId,
      ref : "Review",
    },
  ]
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
