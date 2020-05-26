const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Course = new Schema({
  courseName: String,
  courseSubjects: [
    {
      _id: false,
      Semester: String,
      Subjects: [String]
      
    }
  ],
  courseTotalUnit: String,
})

const CourseSchema  = mongoose.model("Course",Course);
module.exports = CourseSchema;

