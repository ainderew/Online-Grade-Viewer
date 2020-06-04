const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectOffered = new Schema({
    subjectName: String,
    subjectCode: String,
    prerequisites: [String],
    corequisites: [String],
    units: String,
    
    
})

const SubjectsOfferedSchema = mongoose.model("SubjectsOffered",SubjectOffered);
module.exports = SubjectsOfferedSchema;