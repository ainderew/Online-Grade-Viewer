const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Teacher = new Schema({
    teacherName: String,
    idNumber: String,
    password: String,
    subjects: [{
        subjectName: String,
        subjectCode: String,
        subjectSchedule: String,
        sectionCode: String
    }],
    unitsHandled: String,
    accountType: {
        type: String,
        default:"teacher"
    }

})
const TeacherSchema = mongoose.model("Teacher",Teacher);
module.exports = TeacherSchema;