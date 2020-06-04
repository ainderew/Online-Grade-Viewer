const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Student = new Schema ({
    name: {
        type: String,
        required: true
    },
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
        semesterYear: String,
        grades: [
            {
                _id: false,
                subjectId: String,
                subjectName: String
            }
            
            
        ]
    }],
    currentSubjects: [String],
    
    accountType: {
        type: String,
        default:"student"
    }

})

const studentSchema = mongoose.model("Student", Student);

module.exports = studentSchema;