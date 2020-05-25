const express = require("express");
const router = express.Router();
const students = require("../models/Student");

router.get("/", async (req,res) =>{
    try{
        const data = await students.find()
        res.json(data)

    }catch(err){
        res.json(err)
    }
})

module.exports = router