const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const Teacher = require("../models/Teacher");
const { isAuthenticated, isAdmin } = require("../middleware/jwt.middleware");

// Ruta pública para obtener los cursos y profesores (sin autenticación)
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching courses", error: err });
  }
});

router.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching teachers", error: err });
  }
});

// Ruta protegida para agregar un curso (solo para administradores)
// Aplicamos el middleware isAuthenticated para asegurar que el usuario esté autenticado
// Y luego isAdmin para asegurar que solo un admin pueda agregar cursos
router.post("/", isAuthenticated, isAdmin, async (req, res) => {
    const { courseName, courseDescription, courseLevel, courseDuration, requiredMaterials, instructor, image } = req.body;
    try {
      const newCourse = new Course({
        courseName,
        courseDescription,
        courseLevel,
        courseDuration,
        requiredMaterials,
        instructor,
        image
      });
      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (err) {
      console.error("Error creating course:", err); 
      res.status(400).json({ message: "Error creating course", error: err.message });
    }
});

// Ruta protegida para actualizar un curso (solo para administradores)
router.put("/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) {
      return res.status(404).send("Course not found");
    }
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating the course");
  }
});

// Ruta protegida para eliminar un curso (solo para administradores)
router.delete("/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const course = await Course.findByIdAndDelete(req.params.id);
      if (!course) {
        return res.status(404).send("Course not found");
      }
      res.status(200).send("Course deleted");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting the course");
    }
  });
  

module.exports = router;

