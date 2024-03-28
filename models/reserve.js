const mongoose = require('mongoose');
const reserveSchema = new mongoose.Schema({
    date:Date,
    startTime:Number,
    endTime:Number,
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
