const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name:{
        type : String,
        required: true
    },
    role:{
        type : String,
        enum: ['admin', 'guest', 'user'],
        required: true
    },
    email:{
        type : String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    age:{
        type : Number,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    },
    created:{
        type: Date,
        default: Date.now
    }
}, {
    collection : 'users'
})

let User = mongoose.model('User', userSchema);
module.exports = User;