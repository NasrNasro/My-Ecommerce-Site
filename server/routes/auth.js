const express=require('express');
const router=express.Router();
const {signIn,signUp,getCurrent}= require('../controllers/authController')
const {registerRules, validator, loginRules}=require('../middlewares/validator');
const isAuth = require('../middlewares/isAuth');

// signup
router.post('/signup', registerRules, validator, signUp);
// signin
router.post('/signin', loginRules, validator, signIn);
// get current user
router.get('/current', isAuth, getCurrent);

module.exports=router