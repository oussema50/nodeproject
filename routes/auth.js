//create router register,login
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

const {isAuth,notAuthLogin,notAuthRegister} = require('./gardAuth');

//Get The Register Page
router.get('/register',userController.registerPage);
//user register
router.post('/register',userController.registerUser);
//Get The Login Page
router.get('/login',userController.loginPage);
//user login 
router.post('/login',userController.loginUser);
//logout user
router.post('/logout',isAuth,userController.logout );
module.exports = router;