const mongoose = require('mongoose');
const salleSchema = new mongoose.Schema({
    nom:String,
    capacity:Number,
})



const Salle = mongoose.model('Salle',salleSchema)

module.exports = Salle;