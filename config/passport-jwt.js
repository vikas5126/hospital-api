const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWt = require('passport-jwt').ExtractJwt;

const Doctor = require('../models/doctor');

let opts = {
    jwtFromRequest: ExtractJWt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'hopitalapi',
}

passport.use(new JWTStrategy(opts, function(jwtPayload, done){
    Doctor.findById(jwtPayload._id).then((user)=>{
        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    }).catch((err)=>{
        console.log('Error in finding user from JWT', err);
        return done(err);
    })
}))




module.exports = passport;