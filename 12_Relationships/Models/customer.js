// getting-started.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

main().then(() => console.log("Connection successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const orderSchema = new Schema({
  item: String,
  price: Number,
});

const customerSchema = new Schema({
  // FIXED spelling mistake (naem → name)
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ]
});

// customerSchema.pre("findOneAndDelete", async () => {
//     console.log("PRE MIDDLEWARE");
// });

customerSchema.post("findOneAndDelete", async (doc) => {
  // ensure doc exists to avoid errors
  if (doc && doc.orders.length > 0) {
    // FIXED: use correct model name "Order"
    let res = await Order.deleteMany({ _id: { $in: doc.orders } });
    console.log(res);
  }
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

// Add customer with existing orders
const addCustomer = async () => {
  let cust1 = new Customer({
    name: "Rahul Kumar",
  });

  let order1 = await Order.findOne({ item: "Chips" });
  let order2 = await Order.findOne({ item: "Chocolate" });

  // FIX: only push order IDs
  cust1.orders.push(order1._id);
  cust1.orders.push(order2._id);

  let result = await cust1.save();
  console.log(result);
}

// addCustomer();

// const addOrders = async () => {
//   let res = await Order.insertMany([
//     { item: "Samosa", price: 12 },
//     { item: "Chips", price: 10 },
//     { item: "Chocolate", price: 40 }
//   ]);
//   console.log(res);
// };
// addOrders();

// Add customer along with new order
const addCust = async () => {
  let newCust = new Customer({
    name: "Rahul Kumar"
  });

  let newOrder = new Order({
    item: "Mazza",
    price: 250
  });

  // FIX: push only ObjectId
  newCust.orders.push(newOrder._id);

  await newOrder.save();
  await newCust.save();

  console.log("added new customer");
}

// addCust();

// Delete customer
const delCust = async () => {
  let data = await Customer.findByIdAndDelete('691acfe1aebef1415757a9eb');
  console.log(data);
};

delCust();
