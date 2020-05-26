const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Student = new Schema ({
    name: String,
    idNumber: {
        type: String,
        required: true
    },
    course: String,

    yearLevel: {
        type: String,
        default: "I"
    },
    totalUnits: {
        type: String,
        default: "0"
    },
    password: String,
    records: [{
        _id : false,
        semester: String,
        grades: [{
            _id : false,
            subjectName: String,
            subjectGrade: String
        }]
    }]
})

const studentSchema = mongoose.model("Student", Student);

module.exports = studentSchema;