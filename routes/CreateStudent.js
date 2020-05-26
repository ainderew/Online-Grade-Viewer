const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const StudentSchema = require("../models/Student");
const CourseSchema = require("../models/Course");
const SubjectSchema = require("../models/Subjects");

router.post("/", async (req,res) =>{
    let NEW_IDNUMBER = await StudentSchema.findOne().sort({_id: -1})
    NEW_IDNUMBER = (parseInt(NEW_IDNUMBER.idNumber) + 1)
    NEW_IDNUMBER = NEW_IDNUMBER.toString()

    const hashedPassword = await bcrypt.hash(NEW_IDNUMBER, 10)

    const STUDENT_COURSE = await CourseSchema.findOne({courseName: req.body.course})
    const gradesField = []
    STUDENT_COURSE.courseSubjects[0].Subjects.forEach(subject=>{
        const newObject = {subjectName:subject}
        gradesField.push(newObject);
    })
    const recordsField = {
        semester: STUDENT_COURSE.courseSubjects[0].Semester,
        grades: gradesField
    }

    const student = new StudentSchema({
        name: req.body.studentName,
        idNumber: NEW_IDNUMBER,
        password: hashedPassword,
        course: req.body.course,
        records: recordsField
    })
     student.save();

   for(let subject of  STUDENT_COURSE.courseSubjects[0].Subjects){
       const adder = await SubjectSchema.findOne({subjectName:subject})
       adder.students.push({
        name: req.body.studentName,
        idNumber: NEW_IDNUMBER
    })
       await adder.save();
   }

})


module.exports = router;
