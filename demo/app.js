const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();

const PORT = process.env.PORT;
// Require model
var Product = require("./models/Product.js");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/grocerydb", { useNewUrlParser: true });
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//Make public static folder 
app.use(express.static("public"));

// 3. Routes 
app.get("/", function(req, res) {
     res.send("Hello from demo app!");
});
app.get("/products", function(req,res) {
    Product.find({})
    .then(function(dbProducts) {
      res.json(dbProducts);
    })
    .catch(function(err) {
      res.json(err);
    })
  });

app.post("/product", function(req, res) { 
    console.log("in post request"); 
    Product.create(req.body)
    .then(function(dbProduct) {
        // If we were able to successfully create a Product, send it back to the client
        res.json(dbProduct);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
});

// 4. Start the server 
app.listen(PORT, function() { console.log("Listening on port " + PORT ); });

