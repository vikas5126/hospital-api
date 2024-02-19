const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    Patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctor',
    },
    date: {
        type: Date,
        require: true,
    },
    status:{
        type: String,
        require: true,
        enum:['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine',
        'Positive-Admit']
    }
})

const Report = mongoose.model('Report', ReportSchema);
module.exports = Report;