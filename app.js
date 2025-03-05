
require("dotenv").config();


require("./db");


const express = require("express");
const User = require("./models/User.model");
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');
const Course = require('./models/Course');

const app = express();


require("./config")(app);


const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);


const studentRoutes = require('./routes/students.routes');
app.use("/students", studentRoutes);  // Ruta de estudiantes


const teacherRoutes = require('./routes/teachers.routes');
app.use("/teachers", teacherRoutes);  // Ruta de profesores

require("./error-handling")(app);

module.exports = app;




