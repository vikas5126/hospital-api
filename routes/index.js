const express = require('express');
const router = express.Router();
const passport = require('passport');

const doctorController = require('../controller/doctors_controller');
const patientController = require('../controller/patients_controller');
router.get('/', doctorController.home);

// doctor routers 
router.post('/doctors/register', doctorController.register);
router.get('/doctors/login', doctorController.login);

// patient routers 
router.post('/patient/register', passport.authenticate('jwt', {session: false}) ,patientController.patRegister)
router.post('/patient/:id/create_report', passport.authenticate('jwt', {session: false}), patientController.createReport)
router.get('/patient/:id/all_report', passport.authenticate('jwt', {session: false}), patientController.allReport);

// for checking status 
router.get('/report/:status', passport.authenticate('jwt' , {session : false}), patientController.status);
module.exports = router;