class Subject {
  constructor (form) {
    this.facultyId = form.facultyId ? form.facultyId : 0
    this.branchId = form.branchId ? form.branchId : 0
    this.subjectId = form.subjectId ? form.subjectId : ''
    this.subjectName = form.subjectName ? form.subjectName : ''
    this.credits = form.credits ? form.credits : 0
  }
}
export default Subject
