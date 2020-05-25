const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Subject = new Schema({
    subjectName: {
        type: String,
        required: true
    },
    students: [{
        name: String,
        idNumber: String,
        grade: String
    }]
})

const subjectSchema = mongoose.model("Subject",Subject);

module.exports = subjectSchema;