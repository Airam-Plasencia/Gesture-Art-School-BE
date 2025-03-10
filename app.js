require("dotenv").config();
require("./db");

const config = require("./config");
const express = require("express");
const cors = require("cors"); 
const User = require("./models/User");
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');
const Course = require('./models/Course');

const app = express();


const corsOptions = {
  origin: "http://localhost:3000",
  allowedHeaders: ["Authorization", "Content-Type"], 
  methods: ["GET", "POST", "PUT", "DELETE"], 
};


app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const indexRoutes = require("./routes/index.routes");  
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const studentRoutes = require('./routes/students.routes');
app.use("/students", studentRoutes);  // Ruta de estudiantes

const teacherRoutes = require('./routes/teachers.routes');
app.use("/teachers", teacherRoutes);  // Ruta de profesores

const coursesRoutes = require('./routes/courses.routes');
app.use("/courses", coursesRoutes);  // Ruta de cursos

const userRoutes = require('./routes/user.routes');
app.use("/users", userRoutes);


require("./error-handling")(app);

module.exports = app;




