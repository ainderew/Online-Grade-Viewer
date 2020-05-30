const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Subject = new Schema({
    subjectName: {
        type: String,
        required: true
    },
    subjectUnits: String,
    prerequisites: [String],

    students: [{
        _id: false,
        name: String,
        idNumber: String,
        subjectGradeMG: String,
        subjectGradeFG: String
    }]
})

const subjectSchema = mongoose.model("Subject",Subject);

module.exports = subjectSchema;