const express = require('express');
const router = express.Router();
const {authenticate} = require("../middelware/authenticate");

router.get('/',authenticate,(req,res)=>{
    res.render('reservation');
});


module.exports = router;