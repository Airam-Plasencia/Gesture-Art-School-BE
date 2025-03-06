const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: String,
  courseDescription: String,
  courseLevel: String,
  courseDuration: String,
  requiredMaterials: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
