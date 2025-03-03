const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  courseDescription: { type: String, required: true },
  courseLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  courseDuration: { type: String, required: true },
  requiredMaterials: { type: String },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
