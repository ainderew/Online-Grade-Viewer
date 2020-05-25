const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const studentModel = require("../models/Student");


router.post("/", async (req,res) =>{
    const user  = await studentModel.find({"IdNumber":req.body.idNumber})
    const noUser = "no user"
    const wrongPass = "wrong password"
    if (user.length === 0){
        console.log(noUser)
    }else{
        try{
            if (await bcrypt.compare(req.body.password ,user[0].password)){
                res.json(user)
            }else{
                res.json(wrongPass)   
            }
        }catch(err){
            console.log(err)
        }
    }
    
    
    
})

module.exports = router;