const { body, validationResult } = require('express-validator');

const registerRules=[
    body('name', 'Name is required!').notEmpty(),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be at least 6 characters').isLength({min:6})
];
const loginRules=[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password is required').notEmpty()
]
const validator=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}
const productRules=[
    body('name', 'Product name is required!').notEmpty(),
    body('price', 'Product price is required!').notEmpty(),
]
module.exports={ registerRules, validator, loginRules, productRules };