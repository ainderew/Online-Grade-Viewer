const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const studentModel = require("../models/Student");


router.post("/", loginChecker(studentModel),async(req,res) =>{
  res.json(res.response)
  
    
})

function loginChecker(model){
    return async (req,res,next) => {
        const user  = await model.findOne({"idNumber":req.body.idNumber})
        const noUser = "no user"
        const wrongPass = "wrong password"

        if (user == null){
            res.response = noUser// if user does not exist
            return;
        }

        if (await bcrypt.compare(req.body.password ,user.password)){
            res.response = user
        }else{
            res.response = wrongPass // if password is wrong
        }
        next()
    }
    
    
    
}

module.exports = router;