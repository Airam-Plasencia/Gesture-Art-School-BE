
const express = require('express');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const User = require('../models/User');
const Course = require('../models/Course');
const router = express.Router();

router.post('/:userId/courses', isAuthenticated, async (req, res) => {
  const { userId } = req.params;
  const { courseId } = req.body;

  try {
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    
    if (user.courses.includes(courseId)) {
      return res.status(400).json({ message: 'Este curso ya está en tu perfil' });
    }

    
    user.courses.push(courseId);
    await user.save();

    res.status(200).json({ message: 'Curso agregado al perfil', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar curso al perfil', error });
  }
});
router.get('/:userId', isAuthenticated, async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId).populate('courses');
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json({ courses: user.courses });
    } catch (error) {
      res.status(500).json({ message: 'Error al cargar los cursos del perfil', error });
    }
  });
  
module.exports = router;

