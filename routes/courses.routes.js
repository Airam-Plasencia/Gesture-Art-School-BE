const express = require('express');
const Course = require('../models/Course');
const router = express.Router();


async function getCourseIds() {
  const courses = await Course.find();  
  return courses.map(course => ({
    courseId: course._id,
    courseName: course.courseName
  }));
}


router.get('/:id', async (req, res) => {
  try {
    const courseIds = await getCourseIds();
    res.status(200).json(courseIds);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los cursos', error });
  }
});

module.exports = router;
