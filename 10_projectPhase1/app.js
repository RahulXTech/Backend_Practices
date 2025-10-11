const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../10_projectPhase1/models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.get("/testListing", async (req, res) => {
  try {
    let sampleListing = new Listing({
      title: "My New Village",
      description: "Beautiful village place",
      price: 123,
      location: "Canada, Goa",  
      country: "India",
    });

    await sampleListing.save();
    res.send("Sample listing saved successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving listing");
  }
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
