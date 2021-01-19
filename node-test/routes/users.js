const { json } = require("express");
const express = require("express");
var router = express.Router();
var User = require("../models/User.js");
router.get('/', (req, res)=>{
    User.find({})
    .then ( (userList) => {
        res.json(userList);
    })
    .catch ( (error) => {
        res.json(error);
    })
})
module.exports = router;