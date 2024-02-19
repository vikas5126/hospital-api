const Patient = require("../models/patient");
const Report = require("../models/Report")
module.exports.patRegister = async function(req, res){
    try{
        let patient = await Patient.findOne({mobileNumber: req.body.mobileNumber});
        if(patient){
            return res.status(200).json({
                message: "Patient is already register",
                patient: patient._id
            })
        }
        patient = await Patient.create({
            name: req.body.name,
            mobileNumber: req.body.mobileNumber,
            // report: [],
        })
        return res.status(200).json({
            message: "Patient is register",
            patient: patient._id,
        })
    }
    catch(err){
        return res.status(401).json({
            message: "Error in register the patient",
        })
    }
}


module.exports.createReport = async function(req, res){
    try{
        let patient = await Patient.findById(req.params.id);
        if(patient){
            let report = await Report.create({
                Patient: req.params.id,

                // in this req.user.id is because in this time authorization is doing by doctor 
                createdBy: req.user.id,
                date : new Date(),
                status: req.body.status
            })
            patient.report.push(report)
            patient.save();

            return res.status(201).json({
                message: 'Report created successfully',
                data: report
            })
        }
        else{
            return res.status(422).json({
                message: "Patient does not exist"
            })
        }
    }
    catch(err){
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


module.exports.allReport = async function(req, res){
    try{
        const reports = await Report.find({Patient : req.params.id}).populate('createdBy').sort('date')
        const reportData = reports.map(report =>{
            const originalDate = report.date;
            const dateObj = new Date(originalDate);

            const formattedData = dateObj.toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour : "2-digit",
                minute: "2-digit",
                hour12: false,
            });

            // console.log(report.createdBy.username);
            return {
                createdBy: report.createdBy.username,
                status : report.status,
                date: formattedData
            }
        })

        return res.status(200).json({
            message: `List of Reports`,
            reports: reportData
        })
    }
    catch(err){
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


module.exports.status = async function(req,res){
    try{
        let status = await Report.find({status: req.params.status});

        return res.status(200).json({
            message: 'List of specific problem',
            status: status
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

}