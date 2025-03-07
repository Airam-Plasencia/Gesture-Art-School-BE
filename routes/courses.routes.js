const express = require('express');
const Course = require('../models/Course');
const router = express.Router();
const mongoose = require('mongoose');

async function getCourseIds() {
  const courses = await Course.find();
  return courses.map(course => ({
    courseId: course._id,
    courseName: course.courseName
  }));
}


router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();  
    res.status(200).json(courses);  
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los cursos', error });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de curso no válido' });
    }

    const course = await Course.findById(id); 

    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    res.status(200).json(course); 
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el curso', error });
  }
});



router.post('/', async (req, res) => {
  const { courseName, courseDescription, courseLevel, courseDuration, requiredMaterials, instructor } = req.body;

  try {
    const newCourse = new Course({
      courseName,
      courseDescription,
      courseLevel,
      courseDuration,
      requiredMaterials,
      instructor
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el curso', error });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { courseName, courseDescription, courseLevel, courseDuration, requiredMaterials, instructor } = req.body;

  try {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de curso no válido' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, {
      courseName,
      courseDescription,
      courseLevel,
      courseDuration,
      requiredMaterials,
      instructor
    }, { new: true });

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el curso', error });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
   
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de curso no válido' });
    }

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    res.status(200).json({ message: 'Curso eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el curso', error });
  }
});

module.exports = router;

