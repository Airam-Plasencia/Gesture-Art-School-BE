const express = require('express');
const Teacher = require('../models/Teacher');
const router = express.Router();


router.post('/teachers', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, linkedinUrl, program, background, image, courses } = req.body;
    const newTeacher = await Teacher.create({ firstName, lastName, email, phone, linkedinUrl, program, background, image, courses });
    res.status(201).json(newTeacher);
  } catch (err) {
    console.log("Error while creating the teacher", err);
    res.status(500).json({ message: "Error while creating the teacher" });
  }
});


router.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('courses.courseId'); 
    res.status(200).json(teachers);
  } catch (err) {
    console.log("Error while getting teachers", err);
    res.status(500).json({ message: "Error while getting teachers" });
  }
});


router.get('/teachers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (err) {
    console.log("Error while getting teacher by ID", err);
    res.status(500).json({ message: "Error while getting teacher by ID" });
  }
});


router.put('/teachers/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone, linkedinUrl, program, background, image, courses } = req.body;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, { firstName, lastName, email, phone, linkedinUrl, program, background, image, courses }, { new: true });
    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(updatedTeacher);
  } catch (err) {
    console.log("Error while updating teacher", err);
    res.status(500).json({ message: "Error while updating teacher" });
  }
});


router.delete('/teachers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ message: "Teacher deleted" });
  } catch (err) {
    console.log("Error while deleting teacher", err);
    res.status(500).json({ message: "Error while deleting teacher" });
  }
});

module.exports = router;
