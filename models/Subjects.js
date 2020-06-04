const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Subject = new Schema({
    subjectName: {
        type: String,
        required: true
    },
    subjectCode: String,
    subjectUnits: String,
    teacher: String,
    students: [{
        name: String,
        idNumber: String,
        subjectGradeMG: String,
        subjectGradeFG: String
    }],
    studentCapacity: String,
    studentCount: String,
    subjectSchedule: String,
    room: String,
    sectionCode: String,
    year: String,
    Semester: String
    
})

const subjectSchema = mongoose.model("Subject",Subject);

module.exports = subjectSchema;