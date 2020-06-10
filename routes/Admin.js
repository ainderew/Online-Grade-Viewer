const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Student = require("../models/Student");
const SubjectSchema = require("../models/Subjects")
const CourseSchema = require("../models/Course")
const TeacherSchema = require("../models/Teacher")
const AdminSchema = require("../models/admin")
const EnrollmentCodeSchema = require("../models/enrollmentCode")


//create admin account
router.post("/", async (req,res) =>{
  try{
    const response = "done";
    const placeHolder = req.body.password;
    const hashedPassword = await bcrypt.hash(placeHolder, 10);

    const AdminAccount = new AdminSchema({
      
      idNumber: req.body.idNumber,
      password: hashedPassword,
      name: req.body.name
      
    })
    AdminAccount.save()
    res.json(response)


  }catch(err){
    res.json(err)
  }
})


// CREATE TEACHER ACCOUNT DUH
router.post("/CreateTeacherAccount", async(req,res) =>{
  const placeHolder = req.body.password;
  const hashedPassword = await bcrypt.hash(placeHolder, 10);
  
  const TeacherAccount = new TeacherSchema({
    teacherName: req.body.name,
    idNumber: req.body.idNumber,
    password: hashedPassword
  })
  
  TeacherAccount.save()
})

//create a subject
router.post("/CreateSubject", async (req,res) =>{
    // const createSubject = new SubjectSchema({
      
    //   subjectName: req.body.subjectName,
    //   prerequisites: req.body.prerequisites
      
    // })

    // createSubject.save();
    const data = req.body.state;
    res.json(data)
})

//CREATE A COURSE
router.get("/CreateCourse", async (req,res) =>{
  const onbject = {}
  onbject.Semester = "First"
  onbject.Subjects = ["Subject1","Subject2","Subject3","Subject4"]

  const newCourse = new CourseSchema({
    courseName: "test1",
    courseSubjects: onbject,
    courseTotalUnit: "2"
  })

  newCourse.save()
  res.send("saved")
  

})

router.post("/loginEnrollmentCode", async (req,res) =>{
  let NEW_CODE = await EnrollmentCodeSchema.findOne().sort({_id: -1})

  if (NEW_CODE !== null){
    await EnrollmentCodeSchema.updateOne({ _id:NEW_CODE._id },{ $set: {code:req.body.code} })

  }else{
    const newEnrollmentCode = new EnrollmentCodeSchema({
      code: req.body.code
    })
    newEnrollmentCode.save()
  }
  
  res.json("Code Set")
})
module.exports = router;

