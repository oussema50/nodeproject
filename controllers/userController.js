const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.registerPage = (req,res)=>{
    const token = req.cookies.jwtToken;
    if(token){
      jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken) => {
        if (err) {
            res.render('register',{message:req.flash('message')[0]});
           
        } else {
            res.render('reservation');
           
        }
      });
    }else{

        res.render('register',{message:req.flash('message')[0]});
    }
}

exports.registerUser = async (req,res)=>{
    try {
        
        const {firstName,lastName,email,password}=req.body;
        if(firstName.length == 0 || lastName.length == 0 || email.length == 0 || password.length == 0 ){
            req.flash('message','need all the input ');
            res.redirect('/auth/register');

        }
        const userEmail = await User.findOne({email: email});
        if(userEmail){
            req.flash('message','email already exist!');
            res.redirect('/auth/register');

        }
        const user = new User({firstName,lastName,email,password});
        await user.save();
        req.flash('message','User added successfully!')
        res.redirect('/auth/login')
    } catch (err) {
        // res.status(400).send(err.message)
        console.log(err);
        res.render('register',{message:req.flash('message')[0]});
    }
}



exports.loginPage = (req,res)=>{
    const token = req.cookies.jwtToken;
    if(token){
      jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken) => {
        if (err) {
            res.render('login',{message:req.flash('message')[0]});
           
        } else {
            res.render('salles');
           
        }
      });
    }else{
        res.render('login',{message:req.flash('message')[0]});
    }
}

exports.loginUser = async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await User.findOne({email: email});
        if(!user){
            req.flash('message','wrong credential')
            res.redirect('/auth/login')
            
        }
        const isPasswordMatch =await bcrypt.compare(password,user.password);
       if(!isPasswordMatch){
            req.flash('message','wrong credential')
            res.redirect('/auth/login')
        }
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
        res.cookie('jwtToken', token, {
            maxAge: 3600000, 
            httpOnly: true,
            secure: false, 
          });
        res.redirect('/reserve');
    } catch (err) {
        console.log(err);
        res.render('login',{message:req.flash('message')[0]});
    }
}

exports.logout =  (req, res) => {
    res.clearCookie('jwtToken');
    res.end(res.redirect('/')); 
    
  }