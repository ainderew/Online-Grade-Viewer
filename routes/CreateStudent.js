const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const StudentSchema = require("../models/Student");
const CourseSchema = require("../models/Course");
const SubjectSchema = require("../models/Subjects");

router.post("/", async (req,res) =>{
    //ID NUMBER MAKER AND PASSWORD HASHING
    let NEW_IDNUMBER = await StudentSchema.findOne().sort({_id: -1})
    NEW_IDNUMBER = (parseInt(NEW_IDNUMBER.idNumber) + 1)
    NEW_IDNUMBER = NEW_IDNUMBER.toString()

    const hashedPassword = await bcrypt.hash(NEW_IDNUMBER, 10)
    //ID NUMBER MAKER AND PASSWORD HASHING


    //FIND COURSE AND ASSIGN SUBJECTS TO STUDENT
    const STUDENT_COURSE = await CourseSchema.findOne({courseName: req.body.course})
    const gradesField = [] //create array to store subject array with blank grades (the grades field for the student is an array of objects. This stores the objects)

    //for each subject in the first sem of the course an object is made with it's name on it but the grade is left blank
    STUDENT_COURSE.courseSubjects[0].Subjects.forEach(subject=>{
        const newObject = {subjectName:subject}
        gradesField.push(newObject); //the object is pushed to the array
    })

    // the student schema has a semester(String), and grades(an array of objects [gradesField])
    const current = new Date;
    const recordsField = {
        semester: STUDENT_COURSE.courseSubjects[0].Semester,
        semesterYear: current.getFullYear,
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

    //ADDS THE STUDENT TO THE "students" FIELD OF THE SUBJECT
   for(let subject of  STUDENT_COURSE.courseSubjects[0].Subjects){
       const adder = await SubjectSchema.findOne({subjectName:subject})
       adder.students.push({
        name: req.body.studentName,
        idNumber: NEW_IDNUMBER
    })
       await adder.save();
   }

})

router.get("/NewSemester", async (req,res)=>{
    const ID_INIT = new StudentSchema({
        name: "ID_INIT",
        password: "",
        idNumber: "20000000"
    })
    ID_INIT.save();
    res.send("saved")
})


module.exports = router;
