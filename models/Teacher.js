const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  courseName: { type: String, required: true }
});

const teacherSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  linkedinUrl: { type: String },
  program: { type: String, required: true },
  background: { type: String, required: true },
  image: { type: String, required: true },
  courses: [courseSchema]
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
