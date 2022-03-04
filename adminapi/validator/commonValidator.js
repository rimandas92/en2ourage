const { body } = require('express-validator');

exports.RegisterVal = [
  body('firstName').not().isEmpty().withMessage('First name should not be empty').isLength({min: 2, max: 12}).withMessage('First name must have greater then 2 and less then 12 chars long').trim(),
  body('lastName').isLength({ min: 2, max: 18}).withMessage('Last name must have greater then 2 and less then 18 chars long').trim(),
  body('email').not().isEmpty().withMessage('Email should not be empty').isEmail().withMessage('Email must be follow the proper format').isLength({min: 5, max: 45}).withMessage('Email must have greater then 5 and less then 45 chars long'),
  body('password').not().isEmpty().isLength({min: 4, max: 18}).trim().withMessage('Password must have greater then 4 and less then 18 chars long').matches(/\d/).withMessage('Password must contain a number'),    
  body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password does not match');
      }
      return true
  })
]

exports.LoginVal = [
    body('email').not().isEmpty().withMessage('Email should not be empty').isEmail().withMessage('Email must be follow the proper format').isLength({min: 5, max: 45}).withMessage('Email must have greater then 5 and less then 45 chars long').trim(),
    body('password').not().isEmpty().isLength({min: 4, max: 18}).trim().withMessage('Password must have greater then 4 and less then 18 chars long').matches(/\d/).withMessage('Password must contain a number'),    
]

exports.UsertypeAddVal = [
  body('ufullname').not().isEmpty().withMessage('User type full name should not be empty').trim(),
  body('ushortname').not().isEmpty().withMessage('User type short name should not be empty').trim(),
]

exports.UsertypeUpdateVal = [
  body('id').not().isEmpty().withMessage('id should not be empty').trim(),
  body('ufullname').not().isEmpty().withMessage('User type full name should not be empty').trim(),
  body('ushortname').not().isEmpty().withMessage('User type short name should not be empty').trim(),
]


exports.SecuritylevelAddVal = [
  body('title').not().isEmpty().withMessage('Title should not be empty').trim(),
  body('level').not().isEmpty().withMessage('Level should not be empty').trim(),
  body('usertype').not().isEmpty().withMessage('Usertype should not be empty').trim(),
]

exports.SecuritylevelUpdateVal = [
  body('id').not().isEmpty().withMessage('id should not be empty').trim(),
  body('title').not().isEmpty().withMessage('Title should not be empty').trim(),
  body('level').not().isEmpty().withMessage('Level should not be empty').trim(),
  body('usertype').not().isEmpty().withMessage('Usertype should not be empty').trim(),
]