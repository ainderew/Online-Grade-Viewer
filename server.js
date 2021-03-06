const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const app = express();

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log("connected to "+port);
})
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())
mongoose.connect("mongodb+srv://andrewapinon:mongos123@pit-khfqo.mongodb.net/PIT", { useNewUrlParser: true, useUnifiedTopology: true } ,() =>{
    console.log("connected to DB")
})

app.get("/", (req,res)=>{
    res.send("connection")
})

//Routes
const createStudentRoute = require("./routes/CreateStudent");
const sudentDatabaseRoute = require("./routes/StudentDatabase");
const loginRoute = require("./routes/Login");
const adminRoute = require("./routes/Admin");
const teacherRoute = require("./routes/Teacher");

app.use("/createStudent", createStudentRoute);
app.use("/Students", sudentDatabaseRoute);
app.use("/Login", loginRoute);
app.use("/Admin", adminRoute);
app.use("/Teacher", teacherRoute);


