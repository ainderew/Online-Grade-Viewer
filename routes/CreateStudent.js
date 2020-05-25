const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const StudentSchema = require("../models/Student");

router.post("/", async (req,res) =>{
    const hashedPassword = await bcrypt.hash(req.body.idNumber, 10)
     const student = new StudentSchema({
         name: req.body.studentName,
         IdNumber: req.body.idNumber,
         password: hashedPassword
     })
     student.save();
})

module.exports = router;
