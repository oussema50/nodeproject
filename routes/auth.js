//create router register,login
const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();
//Get The Register Page
// router.get('/register',userController.registerPage);

router.post('/register',userController.registerUser);

//user login 
router.post('/login',userController.loginUser);

module.exports = router;