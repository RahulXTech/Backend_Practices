const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://localhost:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to DB");
  await initDB();
  mongoose.connection.close();
}
const initDB = async () => {
  await Listing.deleteMany({});
  // initData.data = initData.data.map((obj)=>({...obj, owner: '692b12eeaf0341a532b05afe'}));
  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};

main().catch(err => console.error(err));