const Salle = require('../models/salle');
const Reservation = require('../models/reserve');
exports.reservePage = async(req,res)=>{
    try{
        const salles = await Salle.find();
        res.render('reserve',{salles:salles});
    }catch(err){
        res.status(400).send(err)
    }
}



exports.detailsPage = async(req,res)=>{
    try{
        const salle = await Salle.findById(req.params.id);
        res.render('roomDetails',{salle:salle})
    }catch(err){
        res.status(400).send(err)
    }
}

exports.makeReservationPage = (req,res)=>{
    res.render('reserveRoom',{roomid:req.params.id});
}

exports.makeReservation = async(req,res)=>{
    try{
        const id = req.params.id
        const{date,startTime,endTime,user} = req.body
        const reserveSalle = await Reservation.find({date:date,startTime:startTime,room:id})
        console.log(reserveSalle)
        if(reserveSalle[0]){
           return res.send('room is reserved');
        }
        const reservation = new Reservation({date,startTime,endTime,user,room:id});
        await reservation.save();
        res.redirect('/reserve')
    }catch(err){
        res.status(400).send(err)
    }
}



