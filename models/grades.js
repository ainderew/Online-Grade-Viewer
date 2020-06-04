const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Grades = new Schema ({
    subjectName: String,
    subjectCode: String,
    units: String,
    studentName: String,
    studentIdNumber: String,
    semester: String,
    year: String,
    MidtermGrade: {
        type: String,
        default: ""
    },
    FinalGrade: {
        type: String,
        default: ""
    }
})

const GradesSchema = mongoose.model("Grade", Grades);
module.exports = GradesSchema;