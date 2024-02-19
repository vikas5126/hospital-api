const express = require('express');
const app = express();
const port = 4000;
const db = require('./config/mongoose');

const passport = require('passport');
const passportJWT = require('./config/passport-jwt');

// this is use for passing data in and also grabbing data in from website 
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize());

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
})
