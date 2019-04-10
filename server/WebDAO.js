/* eslint-disable handle-callback-err */
const mongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const url = 'mongodb+srv://jeff:jeff123@cluster0-mumpe.mongodb.net/test?retryWrites=true'
// const url = 'mongodb://<dbuser>:<dbpassword>@ds131765.mlab.com:31765/ooad_kob'
const dbName = 'ooad_kob'

class WebDAO {
  /* ===========[User DAO]=================== */
  getAllUser () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('User').find({}).project({ '_id': 0, 'password': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  getUserByUsername (username) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('User').findOne({ 'username': username }, { '_id': 0, 'password': 0 }, (err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  insertUser (user) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('User').findOne({ 'username': user.username }, (err, data) => {
          if (err) { throw err }
          if (!data) {
            db.collection('User').insertOne(user, (err, result) => {
              if (err) { throw err }
              client.close()
              return resolve(true)
            })
          } else { client.close(); return resolve(false) }
        })
        client.close()
      })
    })
  }

  addManyStudents (users) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('User').insertMany(users, (err, result) => {
          if (err) { throw err }
          client.close()
          return resolve(true)
        })
        client.close()
      })
    })
  }

  editUser (newUserData) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('User').findOneAndUpdate({ 'username': newUserData.username }, { '$set': newUserData }, (err, result) => {
          if (err) { throw err }
          if (result.value) {
            client.close()
            return resolve(true)
          } else { client.close(); return resolve(false) }
        })
        client.close()
      })
    })
  }

  deleteUserByUsername (username) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('User').findOne({ 'username': username }, (err, data) => {
          if (err) { throw err }
          if (data) {
            db.collection('User').deleteOne({ username }, (err, result) => {
              if (err) { throw err }
              client.close()
              return resolve(true)
            })
          } else { client.close(); return resolve(false) }
        })
        client.close()
      })
    })
  }

  getAllUserByType (type) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('User').find({ 'typeOfUser': type }).project({ '_id': 0, 'password': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  getAllUserByTypeAndUsername (type, username) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        const regex = new RegExp(`${username}`)
        db.collection('User').find({ 'username': regex, 'typeOfUser': type }).project({ '_id': 0, 'password': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }
  /* ===========[Faculty DAO]=================== */
  getAllFaculty () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('Faculty').find({}).project({ '_id': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }
  /* ===========[Score DAO]=================== */

  getAllExamByUsername (username) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        if (_err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('Exam').find({ 'ExamSeat.studentCode': username }).project({ '_id': 0, 'password': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  getAllExamBySubjectId (SubjectId, username) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        if (_err) { resolve(null) }
        const db = client.db(dbName)
        const regex = new RegExp(`${SubjectId}`)
        db.collection('Exam').find({ 'subjectId': regex, 'ExamSeat.studentCode': username }).project({ '_id': 0, 'password': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  /* ===========[GlobalData DAO]=================== */
  getYearAndTerm () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('GlobalData').findOne({}, (err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  editYearAndTerm (newGlobalData) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('GlobalData').findOneAndUpdate({ 'id': newGlobalData.id }, { '$set': newGlobalData }, (err, result) => {
          if (err) { throw err }
          if (result.value) {
            client.close()
            return resolve(true)
          } else {
            client.close()
            return resolve(false)
          }
        })
        client.close()
      })
    })
  }

  /* ===========[Room DAO]=================== */

  getAllBuilding () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        if (_err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('Building').find({}).project({ '_id': 0, 'password': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  editRoom (newBuildingData) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('Building').findOneAndUpdate({ 'building_name': newBuildingData.building_name }, { '$set': newBuildingData }, (err, result) => {
          if (err) { throw err }
          if (result.value) {
            return resolve(true)
          } else { return resolve(false) }
        })
        client.close()
      })
    })
  }

  /* ===========[Building DAO]=================== */
  getBuilding () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('Building').find({}).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  insertBuilding (building) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('Building').findOne({ 'short_name': building.short_name }, (err, data) => {
          if (err) { throw err }
          if (!data) {
            db.collection('Building').insertOne(building, (err, result) => {
              if (err) { throw err }
              client.close()
              return resolve(true)
            })
          } else {
            client.close()
            return resolve(false)
          }
        })
        client.close()
      })
    })
  }

  deleteBuildingByShortName (shortname) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('Building').findOne({ 'short_name': shortname }, (err, data) => {
          if (err) { throw err }
          if (data) {
            db.collection('Building').deleteOne({ 'short_name': shortname }, (err, result) => {
              if (err) { throw err }
              client.close()
              return resolve(true)
            })
          } else {
            client.close()
            return resolve(false)
          }
        })
        client.close()
      })
    })
  }

  getBuildingByShortName (shortname) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        const regex = new RegExp(`${shortname}`)
        db.collection('Building').find({ 'short_name': regex }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  getAllBuildingByRoom (buildingname, roomname) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        if (_err) { resolve(null) }
        const db = client.db(dbName)
        const regex = new RegExp(`${roomname}`)
        db.collection('Building').find({ 'building_name': buildingname, 'Rooms.room': regex }).project({ '_id': 0, 'password': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  /* ===========[Subject DAO]=================== */

  getAllSubjectBySubjectIdOrSubjectName (subjid, subjname) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        const db = client.db(dbName)
        db.collection('Subject').find({ '$or': [{ 'subjectId': subjid }, { 'subjectName': subjname }] }).limit(16).project({ '_id': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  getAllSubject () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        const db = client.db(dbName)
        db.collection('Subject').find({}).project({ '_id': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  insertSubject (subject) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        const db = client.db(dbName)
        db.collection('Subject').findOne({ '$or': [{ 'subjectId': subject.subjectId }, { 'subjectName': subject.subjectName }] }, (err, data) => {
          if (err) { throw err }
          if (!data) {
            db.collection('Subject').insertOne(subject, (err, result) => {
              if (err) { throw err }
              client.close()
              return resolve(true)
            })
          } else { client.close(); return resolve(false) }
        })
        client.close()
      })
    })
  }

  /* ===========[Course DAO]=================== */
  // coming with subject name, subject id

  // ******* [BUG?] NEED MATCH OPERATOR TO RETREVE ONLY MATCH OBJECT *******
  getAllCourseByYearAndSemester (year, semester) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('Subject').aggregate(
          [
            {
              '$project': {
                '_id': 0,
                'subjectId': 1,
                'subjectName': 1,
                'courses': {
                  '$filter': {
                    'input': '$courses',
                    'as': 'course',
                    'cond': { '$and': [
                      { '$eq': [ '$$course.school_year', Number.parseInt(year) ] },
                      { '$eq': [ '$$course.semester', Number.parseInt(semester) ] }
                    ] }
                  }
                }
              }
            }
          ]
        ).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  getAllCourseByYearSemesterAndSubjectId (year, semester, subjectId) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)

        const regex = new RegExp(`${subjectId}`)
        db.collection('Subject').aggregate(
          [
            {
              '$match': { '$and':
              [
                { 'subjectId': { '$regex': regex } },
                { 'courses.school_year': Number.parseInt(year) },
                { 'courses.semester': Number.parseInt(semester) }
              ] }
            },
            {
              '$project': {
                '_id': 0,
                'subjectId': 1,
                'subjectName': 1,
                'courses': {
                  '$filter': {
                    'input': '$courses',
                    'as': 'course',
                    'cond': { '$and': [
                      { '$eq': [ '$$course.school_year', Number.parseInt(year) ] },
                      { '$eq': [ '$$course.semester', Number.parseInt(semester) ] }
                    ] }
                  }
                }
              }
            }
          ]
        ).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  /* ===========[Exam DAO]=================== */

  getAllExamBySubjectIdAndCourseId (subjectId, courseId) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('Exam').find({ '$and': [{ 'subjectId': subjectId }, { 'courseId': Number.parseInt(courseId) }] }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  insertExam (examData) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('Exam').findOne({ 'subjectId': examData.subjectId, 'courseId': examData.courseId, 'category': examData.category }, (err, data) => {
          if (err) { throw err }
          if (!data) {
            db.collection('Exam').insertOne(examData, (err, result) => {
              if (err) { throw err }
              client.close()
              return resolve(result.insertedId)
            })
          } else { client.close(); return resolve(false) }
        })
      })
    })
  }

  deleteExam (objectIdStr) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('Exam').findOneAndDelete({ '_id': new ObjectId(objectIdStr) }, (err, result) => {
          if (err) { throw err }
          client.close()
          return resolve(true)
        })
        client.close()
      })
    })
  }

  getAllExamByDateAndRoom (date, roomId) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)

        db.collection('Exam').aggregate(
          [
            {
              '$match': { '$and':
              [
                { 'date': date },
                { 'rooms.roomId': roomId }
              ] }
            },
            {
              '$addFields': {
                'rooms': {
                  '$filter': {
                    'input': '$rooms',
                    'as': 'room',
                    'cond': { '$eq': [ '$$room.roomId', roomId ] }
                  }
                }
              }
            }
          ]
        ).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  addRoomIntoExam (examId, roomData) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('Exam').findOneAndUpdate({ '_id': new ObjectId(examId) }, { '$push': { 'rooms': roomData } }, (err, result) => {
          if (err) { throw err }
          if (result) {
            client.close()
            return resolve(true)
          } else { return resolve(false) }
        })
        client.close()
      })
    })
  }
}

module.exports = WebDAO
