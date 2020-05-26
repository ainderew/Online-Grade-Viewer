const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const studentModel = require("../models/Student");


router.post("/", async (req,res) =>{
    const user  = await studentModel.findOne({"idNumber":req.body.idNumber})
    const noUser = "no user"
    const wrongPass = "wrong password"

    if (user == null){
        res.json(noUser)// if user does not exist
        return;
    }

    if (await bcrypt.compare(req.body.password ,user.password)){
        res.json(user)
    }else{
        res.json(wrongPass); // if password is wrong
    }
    
    
    
})

module.exports = router;