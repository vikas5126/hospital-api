const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    mobileNumber: {
        type: String,
        require: true
    },
    report:[
        {
            type: mongoose.Schema.Types.ObjectId,
            require: true
        }
    ]
},{
    timestamps: true
})

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;