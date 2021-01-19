const mongoose = require("mongoose");
// Get the Schema constructor 
const Schema = mongoose.Schema;
const ProductSchema = new Schema({ 
    name: {
        type: String,
        required: true
    }, 
    quantity: {
        type: Number,
        required: true
    }, 
    departments: {
        type: Array,
        required: true
    } 
});

const Product = mongoose.model("Product", ProductSchema);

// Export model 
module.exports = Product; 

