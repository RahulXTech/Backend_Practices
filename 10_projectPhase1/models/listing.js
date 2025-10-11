const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    set: (v) =>
      v === ""
        ? "https://tse4.mm.bing.net/th/id/OIP.DJ9kFLwuoKQfFaJiI8X3ggHaE8?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
        : v,
  },
  price: Number,
  location: String,
  country: String, // ✅ fixed spelling
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
