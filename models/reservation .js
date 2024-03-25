const mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema({
    dateDebut:Date,
    dateFin:Date,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    sale:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Salle',
    }
});

const Reservation = mongoose.model('Reservation',reservationSchema);

module.exports = Reservation;
