const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  courseName: { type: String, required: true },
  progress: { type: Number, default: 0 },
  enrollmentDate: { type: Date, required: true }
});

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  program: String,
  background: String,
  image: String,
  cohort: Number,
  courses: [{
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    progress: { type: Number, default: 0 },
    enrollmentDate: Date
  }]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
