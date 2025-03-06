const express = require('express');
const Student = require('../models/Student');
const mongoose = require('mongoose');
const Course = require('../models/Course'); 
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const studentData = req.body;

    
    if (studentData.courses) {
      studentData.courses = await Promise.all(
        studentData.courses.map(async (course) => {
          
          const foundCourse = await Course.findById(course.courseId);
          if (foundCourse) {
            
            return {
              ...course,
              courseName: foundCourse.courseName,  
              courseDescription: foundCourse.courseDescription,  
              courseLevel: foundCourse.courseLevel,  
              courseDuration: foundCourse.courseDuration  
            };
          } else {
            throw new Error(`Course with ID ${course.courseId} not found`);
          }
        })
      );
    }

    
    const newStudent = new Student(studentData);
    const savedStudent = await newStudent.save();

    
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error('Error creando estudiante:', error);
    res.status(500).json({ message: 'Error creando estudiante', error });
  }
});


router.get('/', async (req, res) => {
  try {
    const students = await Student.find().populate('courses.courseId');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('courses.courseId');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student', error });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error });
  }
});

module.exports = router;


