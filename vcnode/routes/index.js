var express = require('express');
var router = express.Router();
// const validator = require('../validation')
const FUNCTION = require('../function');
const dbconfig = require('../dbconfig');
const {check, oneOf, validationResult} = require('express-validator');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/',oneOf( [ 
  check('User_name').exists()
  .notEmpty()
  .withMessage('User required'),
  check('Password').exists()
  .notEmpty()
  .withMessage('Password does not exists')
]), async function(req, res, next) { 
  debugger
  console.log('---------------------',req.body);
  var errors = validationResult(req).array();
  console.log('---------------------',errors);
  try {
    // validationResult(req).throw();
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
      // Build your resulting errors however you want! String, object, whatever - it works!
      return `${location}[${param}]: ${msg}`;
    };
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      // Response will contain something like
      // { errors: [ "body[password]: must be at least 10 chars long" ] }
      // return res.json({ errors: result.array() });
      res.redirect('login', { 'errors': result.array() });
    }else{
      try{
        // const resultSet = await  
        dbconfig.preparedStatement("select * from Users where ? ", {"Id":1}, function(err, rows)   {
          console.log(rows);
          res.redirect('/users/dashboard');
        });
      }
      catch(err){
        console.log(err);
        res.redirect('/');
      }
      // yay! we're good to start selling our skilled services :)))
      // res.redirect('users', { title: 'Express' });
      
    }
    
  } catch (err) {
    // Oh noes. This user doesn't have enough skills for this...
    res.status(422).json();
  }
  
});

module.exports = router;
