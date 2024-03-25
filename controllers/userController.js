const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.registerPage = (req,res)=>{
    res.render('register')
}

exports.registerUser = async (req,res)=>{
    try {
    
        const {firstName,lastName,email,password}=req.body;
        const user = new User({firstName,lastName,email,password});
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send(error.message)
    }
}




exports.loginUser = async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).send('user not found')
        }
        const isPasswordMatch =await bcrypt.compare(password,user.password);
       if(!isPasswordMatch){
            return res.status(401).send('invalid password')
        }
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
        res.send({token:token})
    } catch (err) {
     res.status(400).send(err.message)
    }
 }