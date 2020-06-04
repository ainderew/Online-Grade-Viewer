const express = require("express");
const router = express.Router();
const SubjectModel = require("../models/Subjects");
const StudentModel = require ("../models/Student");
const GradesModel = require ("../models/grades");

router.post("/", async (req,res) =>{

    const data = await SubjectModel.findOne({subjectName:req.body.subjectNamed,teacher:req.body.name})
    res.json(data);

})

router.post("/submitGrades", submitGrade() ,async (req,res)=>{
    res.json(res.response)
})

 function submitGrade(){
    return async (req,res,next) =>{
        const response = "done"
        const gradingPeriod = req.body.gradeField

        const changedGrade = {}
        changedGrade[gradingPeriod] = req.body.grade;

        const finder = await GradesModel.updateOne({
            "subjectName": req.body.subjectName,
            "studentIdNumber": req.body.id,
            "year": req.body.year,
            "semester": req.body.semester
        },
            changedGrade
        )
       
        res.response = finder;
        next();
    }
}

module.exports = router;