const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const studentModel = require("../models/Student");
const teacherModel = require("../models/Teacher");


router.post("/", loginChecker(studentModel),async(req,res) =>{
  res.json(res.response)
  
    
})
router.post("/adminLogin", loginChecker(teacherModel),async(req,res) =>{
  res.json(res.response)
  
    
})

function loginChecker(model){
    return async (req,res,next) => {
        const user  = await model.findOne({"idNumber":req.body.idNumber})
        const responseObject = {
            noUser: "no user",
            wrongPass:"wrong password"
        }

        if (user == null){
            res.response = responseObject.noUser// if user does not exist
            next()
            return;
        }

        if (await bcrypt.compare(req.body.password ,user.password)){
            res.response = user
        }else{
            res.response = responseObject.wrongPass // if password is wrong
        }
        next()
    }
    
    
    
}

module.exports = router;