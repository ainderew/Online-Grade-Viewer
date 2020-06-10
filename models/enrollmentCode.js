const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enrollmentCode = new Schema({

    code: {
        required: true,
        type: String
    }
})

const enrollmentCodeSchema = mongoose.model("EnrollmentCode", enrollmentCode);
module.exports = enrollmentCodeSchema;