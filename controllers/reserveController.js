const Salle = require('../models/salle');
const Reservation = require('../models/reserve');
exports.reservePage = async(req,res)=>{
    try{
        const salles = await Salle.find();
        res.render('reserve',{salles:salles,successmsg:req.flash('successmsg')[0]});
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
    res.render('reserveRoom',{roomid:req.params.id,errormsg:req.flash('errormsg')[0]});
}

exports.makeReservation = async(req,res)=>{
   
    try{
        const id = req.params.id;
        const{date,startTime,endTime,user} = req.body;
        let error = false;
        //current date
        const currentDate = new Date();

        const currentDay = currentDate.getDate();

        const currentMonth = currentDate.getMonth() + 1;

        const currentYear = currentDate.getFullYear();
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();

        //reservation date
        const dateReservation = new Date(date); 
        const getDay = dateReservation.getDay();
        const dayResevation = dateReservation.getDate();
        const monthResevation = dateReservation.getMonth() + 1;
        const yearResevation = dateReservation.getFullYear();
        
        const convStrToNumber = (strTime)=>{
            const time = strTime.split(':');
            return [Number(time[0]),Number(time[1])];

        }
        const [startHour,startMinute] = convStrToNumber(startTime);
        const [endHour,endMinute] = convStrToNumber(endTime);

        if(dayResevation < currentDay || monthResevation < currentMonth ||yearResevation < currentYear){
            error = true;
            req.flash('errormsg','wrong day')
            res.redirect(`/reserve/room/${id}`);
            // console.log('hello')
        }
        if(dayResevation == currentDay)
        {
            console.log('dayResevation ==>', dayResevation)
            console.log('currentDay ==>', currentDay)
            if(startHour <= currentHour){
                console.log('startHour ==>', startHour)
                console.log('currentHour ==>', currentHour)
                // res.status(400).render('reserveRoom',{message:'error hour'});
                if(startMinute < currentMinute ){
                    error = true;
                    req.flash('errormsg','The hours in question have already passed')
                    res.redirect(`/reserve/room/${id}`);
                } 
            }
        }
        if(startHour == endHour){
            if(endMinute >= startMinute){
                const reservTime = endMinute - startMinute;
                if(reservTime < 30){
                    error = true;
                    req.flash('errormsg','you need to reserve the room for 30 min at least')
                    res.redirect(`/reserve/room/${id}`);
                }
            }
        }  
        if(getDay == 0){
            error = true;
            req.flash('errormsg','we are not working at weekend')
            res.redirect(`/reserve/room/${id}`);
        }
        const conflict = await Reservation.exists({
            room: id,
            day: dayResevation,
            month: monthResevation,
            year: yearResevation,
            $or: [
                {
                    $and: [
                        { 
                            $or: [
                                { startHour: { $lt: endHour } },
                                { 
                                    startHour: endHour,
                                    startMinute: { $lt: endMinute }
                                }
                            ]
                        },
                        { 
                            $or: [
                                { endHour: { $gt: startHour } },
                                { 
                                    endHour: startHour,
                                    endMinute: { $gt: startMinute }
                                }
                            ]
                        }
                    ]
                },
                { 
                    $and: [
                        { startHour: { $gte: startHour } }, 
                        { endHour: { $lte: endHour } },
                        { 
                            $or: [
                                { startMinute: { $gte: startMinute } },
                                { endMinute: { $lte: endMinute } }
                            ]
                        }
                    ] 
                } 
            ]
        });

        if (conflict) {
            
            req.flash('errormsg','room is reserved in these hours')
            res.redirect(`/reserve/room/${id}`);
        } else if(!error) {
            const reservation = new Reservation({
                day: dayResevation,
                month:monthResevation,
                year:yearResevation,
                startHour,
                startMinute,
                endHour,
                endMinute,
                user,
                room:id
            });
            await reservation.save();
            req.flash('successmsg','room is reserved');
            res.redirect('/reserve');
        }
       
      
    }catch(err){
        console.log(err);
        // res.status(400).send(err);
    }
}

exports.userReservation = async(req,res)=>{
    try{
        const id = req.params.id;
        const yourReservations = await Reservation.find({user:id}).populate('room', 'nom capacity');
        console.log(yourReservations);
        res.render('youReservation',{reservations:yourReservations,message:req.flash('message')[0]});
    }catch(err){
        res.status(400).send(err);
    }
}



exports.deleteReservation = async(req,res)=>{
    try{
        const reserveid = req.query.reserveid;
        const userid = req.query.userid;
        const deleteReservation= await Reservation.findByIdAndDelete({_id:reserveid});
        req.flash('message','your reservation is deleted')
        res.redirect(`/reserve/user/${userid}`);
    }catch(err){
        console.log(err)
        // res.status(403).send(err)
    }
}

exports.deleteAllReservation = async(req,res)=>{
    try{
        await Reservation.deleteMany({});
        req.flash('successmsg','delete all the reservation');
        res.redirect('/reserve');
    }catch(err){
        console.log(err)
    }
}