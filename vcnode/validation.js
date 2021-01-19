// import validator from 'validator';
const {check, validationResult} = require('express-validator');
exports.validate = (method) => {
    switch (method) {
      case 'login': {
       return [ 
            check('User_name').exists()
            .withMessage('User name doesn\'t exists'),
            check('Password').exists()
            .withMessage('Password does not exists')
         ]   
      }
    }
  }