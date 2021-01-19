const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    ProductName:{
        type: String,
        required: true
    },
    SupplierID:{
        type: Number,
    },
    CategoryID:{
        type: mongoose.ObjectId,

    },
    QuantityPerUnit:{
        type: Number,
    },
    UnitPrice:{
        type: Decimal,
    },
    UnitsInStock:{},
    UnitsOnOrder:{},
    ReorderLevel:{},
    Discontinued:{

    }

})