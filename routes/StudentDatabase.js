const express = require("express");
const router = express.Router();
const studentSchema = require("../models/Student");
const gradeSchema = require("../models/grades")

router.get("/", async (req,res) =>{
    try{
        const data = await studentSchema.find()
        res.json(data)

    }catch(err){
        res.json(err)
    }
})

router.post("/getGradeInfo", async (req,res) =>{
    try{
        const grade = await gradeSchema.findOne({
            "subjectName": req.body.subjectName,
            "studentIdNumber": req.body.idNumber,
            "semester": req.body.semester,
            "year": req.body.year
            
        })
        res.json(grade)

    }catch(err){
        res.json(err)
    }
})



module.exports = router