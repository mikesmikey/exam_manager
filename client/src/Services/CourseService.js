import axios from 'axios'
import CGlobalDataService from './GlobalDataService'
const GlobalDataService = new CGlobalDataService()
class CourseService {

  getAllCurrentCourse() {
    return new Promise((resolve, reject) => {
      GlobalDataService.getYearAndTerm().then((timeData) => {
        if (!timeData) return null
        axios.get(`/subject/find/courses/year/${timeData.currentStudyYear}/semester/${timeData.currentStudyTerm}`).then((result) => {
          resolve(result.data)
        })
      })
    })
  }

  searchAllCurrentCourseBySubjectId(subjectId, startPos, limit) {
    return new Promise((resolve, reject) => {
      GlobalDataService.getYearAndTerm().then((timeData) => {
        if (!timeData) return null
        axios.get(`/subject/find/courses/year/${timeData.currentStudyYear}/semester/${timeData.currentStudyTerm}/id/${subjectId || 'none'}/${startPos || 0}/${limit || 0}`).then((result) => {
          resolve(result.data)
        })
      })
    })
  }

  getCourseByIdAndSubjectId(courseId, subjectId) {
    return new Promise((resolve, reject) => {
      axios.get(`/subject/find/course/id/${subjectId}/courseId/${courseId}`).then((result) => {
        resolve(result.data)
      })
    })
  }

  deleteCourse(a, b) {
    return new Promise((resolve, reject) => {
      axios.post(`/subject/remove/course/id/${a}/courseId/${b}`).then((result) => {
        resolve(result.data)
      })
    })
  }

  getNameteacherFormRegisterCourseBySubjectId(subjecId) {
    return new Promise((resolve, reject) => {
      axios.get(`/subject/regCourse/find/teacher/id/${subjecId}`).then((result) => {
        resolve(result.data)
      })
    })
  }

  getAllDataCoures() {
    return new Promise((resolve, reject) => {
      this.getAllCouresCurrent().then((ArrayObj) => {
        if (ArrayObj.length > 1) {
          ArrayObj.forEach(element => {
            this.getObjectCountRegisterCourseBySubjectId(element[0].subjectNumber).then((result) => {
              element[0].studentRegister = result.length
          //    element[0].teacherName = result[1]
            })
          })
        }
        resolve(ArrayObj)
      })
    })
  }
  getCurrentCourse(array,year,semater) {
      for (let i = 0; i < array.courses.length; i++) {
        if (Number.parseInt(year) === Number.parseInt(array.courses[i].school_year) &&
          Number.parseInt(semater) === Number.parseInt(array.courses[i].semester)) {
            let result = 0
            result = array.courses[i].courseId - 1
            return result
        }
      }
  }
  
  getAllCouresCurrent() {
    return new Promise((resolve, reject) => {
      axios.get('/subject/findone').then((result) => {
        var listCourse = []
        for (var i = 0; i < result.data.length - 1; i++) {
         let year = result.data[result.data.length-1][0]
         let semater = result.data[result.data.length-1][1]
         let indexCourse = this.getCurrentCourse(result.data[i],year,semater)
         //console.log(indexCourse)
          var objarray = [{
            subjectNumber: result.data[i].subjectId,
            subjectName: result.data[i].subjectName,
            students: result.data[i].courses[indexCourse].max_students,
            courseId: result.data[i].courses[indexCourse].courseId,
            groups: result.data[i].courses[indexCourse].max_groups,
            year: result.data[result.data.length - 1][0],
            semater: result.data[result.data.length - 1][1],
            teacherName: [],
            studentRegister: 0
          }]
          listCourse.push(objarray)
        }
        resolve(listCourse)
      })
    })
  }

  getObjectCountRegisterCourseBySubjectId(subjecId) {
    return new Promise((resolve, reject) => {
      axios.get(`/subject/regCourse/find/id/${subjecId}`).then((result) => {
        resolve(result.data)
      })
    })
  }
}
export default CourseService