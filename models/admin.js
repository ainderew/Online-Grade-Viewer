const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Admin = new Schema({
    idNumber: {
        type: String,
        required: true
    },
    password: String,
    name: String,
    accountType: {
        type: String,
        default:"admin"
    }

    
})

const AdminSchema = mongoose.model("Admin", Admin) 
module.exports = AdminSchema;