const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Teacher = new Schema({
    teacherName: String,
    idNumber: String,
    password: String,
    Subjects: [String],
    unitsHandled: String
})
const TeacherSchema = mongoose.model("Teacher",Teacher);
module.exports = TeacherSchema;