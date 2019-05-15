const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  typeOfUser: {
    type: String
  },
  isExaminer: {
    type: Boolean
  },
  branchId: {
    type: Number
  },
  facultyId: {
    type: Number
  },
  year: {
    type: Number
  },
  standing: {
    type: String
  },
  courses: {
    type: Object
  },
  examList: {
    type: Object
  }
}, {
  collection: 'User'
})

User.methods.getAllStudentByRegisteredCourse = function (subjectId, courseId, callback) {
  const query = { 'typeOfUser': 'student',
    'courses.subjectId': subjectId,
    'courses.courseId': courseId
  }
  return this.model('User').find(query, callback).select({ '_id': 0, 'password': 0 })
}

module.exports = mongoose.model('User', User)