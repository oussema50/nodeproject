const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.registerPage = (req,res)=>{
    const token = req.cookies.jwtToken;
    if(token){
      jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken) => {
        if (err) {
            res.render('register');
           
        } else {
            res.render('reservation');
           
        }
      });
    }else{
        res.render('register');
    }
}

exports.registerUser = async (req,res)=>{
    try {
        console.log(req.body); 
        const {firstName,lastName,email,password}=req.body;
        const user = new User({firstName,lastName,email,password});
        await user.save();
        res.redirect('/auth/login')
    } catch (error) {
        res.status(400).send(error.message)
    }
}



exports.loginPage = (req,res)=>{
    const token = req.cookies.jwtToken;
    if(token){
      jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken) => {
        if (err) {
            res.render('login');
           
        } else {
            res.render('reservation');
           
        }
      });
    }else{
        res.render('login');
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
        res.cookie('jwtToken', token, {
            maxAge: 3600000, 
            httpOnly: true,
            secure: false, 
          });
        res.redirect('/reservation');
    } catch (err) {
     res.status(400).render('login',{message:err.message})
    }
}

exports.logout =  (req, res) => {
    res.clearCookie('jwtToken');
    res.end(res.redirect('/')); 
    
  }