const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Subjects = require("../models/Subjects")
const Course = require("../models/Course")


router.get("/", (req,res) =>{
  res.send("admin")
})

router.post("/CreateSubject", async (req,res) =>{
    const createSubject = new Subjects({
      
      subjectName: req.body.subjectName,
      prerequisites: req.body.prerequisites
      
    })

    createSubject.save();
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

