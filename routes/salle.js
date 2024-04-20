//create router register,login
const express = require('express');
const router = express.Router();
const {authenticate} = require("../middelware/authenticate");
const salleController = require("../controllers/salleController");
//Get The salles Page
router.get('/',authenticate,salleController.sallePage);

//Get The create Page Of Salle 
router.get('/create',authenticate,salleController.salleCreatePage);
//Create A New Salle
router.post('/create',authenticate,salleController.createSalle);
//Get The Update Page Of Salle
router.get('/update/:id',authenticate,salleController.salleUpdatePage);
//Update the Salle
router.post('/update/:id',authenticate,salleController.updateSalle);
//Delete Salle
router.get('/delete/:id',authenticate,salleController.deleteSalle);
//room details
router.get('/details/:id',authenticate,salleController.roomDetails);
//all room reservation
router.get('/allreservations',authenticate,salleController.allReservations);



module.exports = router;