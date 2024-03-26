exports.isAuth = (req,res,next)=>{
    next()
    // if(req.cookies.jwtToken){
    //     next()
    // }else{
    //     res.redirect('/auth/login');
    // }
}
