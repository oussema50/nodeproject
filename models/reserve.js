const mongoose = require('mongoose');
const reserveSchema = new mongoose.Schema({
    day:Number,
    month:Number,
    year:Number,
    startHour:Number,
    startMinute:Number,
    endHour:Number,
    endMinute:Number,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Salle',
    }
});

const reservation = mongoose.model('Reservation',reserveSchema);

module.exports = reservation;
