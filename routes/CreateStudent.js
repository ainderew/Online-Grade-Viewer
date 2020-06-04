const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const StudentSchema = require("../models/Student");
const CourseSchema = require("../models/Course");
const SubjectSchema = require("../models/Subjects");
const GradesSchema = require("../models/grades");

router.post("/", async (req,res) =>{
    //ID NUMBER MAKER AND PASSWORD HASHING
    let NEW_IDNUMBER = await StudentSchema.findOne().sort({_id: -1})
    NEW_IDNUMBER = (parseInt(NEW_IDNUMBER.idNumber) + 1)
    NEW_IDNUMBER = NEW_IDNUMBER.toString()

    const hashedPassword = await bcrypt.hash(NEW_IDNUMBER, 10)
    //ID NUMBER MAKER AND PASSWORD HASHING


    //FIND COURSE AND ASSIGN SUBJECTS TO STUDENT
    const current = new Date;
    const STUDENT_COURSE = await CourseSchema.findOne({courseName: req.body.course})
    const currentSubjectsField = [] //create array to store subject array with blank grades (the grades field for the student is an array of objects. This stores the objects)

    //for each subject in the first sem of the course an object is made with it's name on it but the grade is left blank
    for(let subject of  STUDENT_COURSE.courseSubjects[0].Subjects){
        const subjectID = await SubjectSchema.findOne({"subjectName": subject})
        const grade = new GradesSchema({
            subjectName: subjectID.subjectName,
            subjectCode: subjectID.subjectCode,
            units: subjectID.subjectUnits,
            studentName: req.body.name,
            studentIdNumber:  NEW_IDNUMBER,
            semester:  STUDENT_COURSE.courseSubjects[0].Semester,
            year: current.getFullYear()
        })
        grade.save()
        currentSubjectsField.push(subjectID.subjectName); //the object is pushed to the array
    }
    // STUDENT_COURSE.courseSubjects[0].Subjects.forEach(subject=>{
    //     const subjectID = await SubjectSchema.findOne({"subjectName": subject})
    //     const newObject = {
    //         _id: subjectID._id,
    //         subjectName:subject
    //     }
    //     gradesField.push(newObject); //the object is pushed to the array
    // })

    // the student schema has a semester(String), and grades(an array of objects [gradesField])
    const gradesField = [];
    
    for( let subject of currentSubjectsField){
        const GRADE_ID = await GradesSchema.findOne({
            subjectName: subject,
            studentName: req.body.name,
            studentIdNumber:  NEW_IDNUMBER
        })
        const subObj = {
            subjectId: GRADE_ID._id,
            subjectName: GRADE_ID.subjectName
        }
        gradesField.push(subObj)
    }

    const recordsField = ({
        semester: STUDENT_COURSE.courseSubjects[0].Semester,
        semesterYear: current.getFullYear(),
        grades: gradesField
    })
    

    const student = new StudentSchema({
        name: req.body.studentName,
        idNumber: NEW_IDNUMBER,
        password: hashedPassword,
        course: req.body.course,
        records: recordsField,
        currentSubjects: currentSubjectsField
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
