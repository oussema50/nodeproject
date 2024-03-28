const express = require('express');
const router = express.Router();
const {authenticate} = require("../middelware/authenticate");
const reserveController = require("../controllers/reserveController");
router.get('/',authenticate,reserveController.reservePage);
router.get('/details/:id',authenticate,reserveController.detailsPage);
router.get('/room/:id',authenticate,reserveController.makeReservationPage);
router.post('/room/:id',authenticate,reserveController.makeReservation);


module.exports = router;