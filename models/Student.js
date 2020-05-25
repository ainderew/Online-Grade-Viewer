const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Student = new Schema ({
    name: String,
    IdNumber: {
        type: String,
        required: true
    },
    password: String,
    Subjects: [String]
})

const studentSchema = mongoose.model("Student", Student);

module.exports = studentSchema;