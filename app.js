require("dotenv").config();
require("./db");

const express = require("express");

const User = require("./models/User");
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');
const Course = require('./models/Course');
const { isAuthenticated, isAdmin } = require('./middleware/jwt.middleware');

const app = express();

require("./config")(app);


/* app.use(express.json());
app.use(express.urlencoded({ extended: true })); */

// Rutas
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// Rutas protegidas
const studentRoutes = require('./routes/students.routes');
app.use("/students", isAuthenticated, studentRoutes);  // Ruta de estudiantes

const teacherRoutes = require('./routes/teachers.routes');
app.use("/teachers", teacherRoutes);  // Ruta de profesores

const coursesRoutes = require('./routes/courses.routes');
app.use("/courses", coursesRoutes);  // Ruta de cursos

const userRoutes = require('./routes/user.routes');
app.use("/users",  userRoutes);  // Ruta de usuarios

// Rutas de administración de cursos
const adminCourseRoutes = require('./routes/adminCourses.routes');
app.use("/admin/courses", isAuthenticated, isAdmin, adminCourseRoutes);  // Solo accesible por administradores

require("./error-handling")(app);

module.exports = app;






