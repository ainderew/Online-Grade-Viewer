const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Student = require("../models/Student");
const SubjectSchema = require("../models/Subjects")
const Course = require("../models/Course")
const TeacherSchema = require("../models/Teacher")
const AdminSchema = require("../models/admin")


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


router.post("/CreateTeacherAccount", async(req,res) =>{
  const placeHolder = req.body.password;
  const hashedPassword = await bcrypt.hash(placeHolder, 10);
  
  const TeacherAccount = new TeacherSchema({
    teacherName: req.body.name,
    teacherIdNumber: req.body.idNumber,
    teacherPassword: hashedPassword
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


router.get("/CreateCourse", async (req,res) =>{
  const onbject = {}
  onbject.Semester = "First"
  onbject.Subjects = ["Subject1","Subject2","Subject3","Subject4"]

  const newCourse = new Course({
    courseName: "test1",
    courseSubjects: onbject,
    courseTotalUnit: "2"
  })

  newCourse.save()
  res.send("saved")
  

})


module.exports = router;

