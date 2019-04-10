class Exam {
  constructor (form) {
    this._id = form._id
    this.subjectId = form.subjectId
    this.subjectName = form.subjectName
    this.category = form.category
    this.courseId = form.courseId
    this.creatorId = form.creatorId
    this.date = form.date
    this.startTime = form.startTime
    this.rooms = form.rooms
    this.roomConfirm = form.roomConfirm
    this.examiners = form.examiners
    this.examinerConfirm = form.examinerConfirm
    this.examSeatType = form.examSeatType
    this.orderSeat = form.orderSeat
    this.maxScore = form.maxScore
    this.scoreAnoucementDay = form.scoreAnoucementDay

    this.status = this.decideExamStatus()
  }

  decideExamStatus () {
    if (!this.date) {
      return 'noExamData'
    } else if (!this.roomConfirm) {
      return 'noRoomData'
    } else if (!this.examinerConfirm) {
      return 'noExaminerData'
    } else {
      return 'complete'
    }
  }

  setExamData (key, value) {
    this[key] = value
    this.status = this.decideExamStatus()
  }

  getExamObjectdata () {
    var objData = {}
    Object.keys(this).forEach(key => {
      objData[key] = this[key]
    })
    return objData
  }
}

export default Exam
