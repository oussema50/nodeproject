const jwt = require('jsonwebtoken');
const User = require('../models/user');
exports.authenticate = (req,res,next) =>{
    const token = req.cookies.jwtToken;
    if(token){
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            res.redirect('/auth/login')
        } else {
          next();
        }
      });
    }else{
      res.redirect('/auth/login');
    }

}

exports.checkuser = (req,res,next)=>{
  const token = req.cookies.jwtToken;
  if(token){
    jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const user = await User.findById(decodedToken._id)
        res.locals.user=user;
        next();
      }
    });
  }else{
    res.locals.user = null;
    next();
  }
}
