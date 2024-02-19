const Doctor = require('../models/doctor')
const Report = require('../models/Report')
// const jwt = require("../config/passport-jwt")
const jwt = require('jsonwebtoken');

module.exports.home = function(req, res){
    return res.status(200).send('Hospital Api');
}

// this is for register the doctor in hospital api 
module.exports.register= async function(req, res){
    try{
        let doctor = await Doctor.findOne({username: req.body.username})
        if(doctor){
            return res.status(409).json
            ({
                message: "UserName Already Exists",
            })
        }
        doctor = await Doctor.create({
            username: req.body.username,
            password: req.body.password,
        })
        return res.status(201).json({
            message: "doctor register is successfully",
            data: doctor
        })
    }catch(err){
        console.log('error in register in doctor', err);
        return res.status(500).json({
            message: "Internal Error",
        });
    }
}

// this is for login the doctor and creating jwt web token 
module.exports.login = async function(req, res){
    try{
        let doctor = await Doctor.findOne({username : req.body.username});
        if(doctor.password != req.body.password){
            return res.status(422).json({
                message: "Invalid Username and Password",
            })
        }
        return res.status(200).json({
            message: "logged in successfully",
            data: {
                token: jwt.sign(doctor.toJSON(), 'hopitalapi', {expiresIn : '6000000'}),
            }
        })
    }catch(err){
        console.log(err);
        return res.status(401).json({
            message: "Internal Error",
        })
    }
}