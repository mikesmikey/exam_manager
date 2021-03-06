/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import {
  Route
} from 'react-router-dom'

// mainscreen component
import MainNavBar from './MainNavBar'
import MainMenuBar from './MainMenuBar'

// all pages
import Home from '../Home/Home'
import ExamSchedule from '../ExamSchedule/ExamSchedule'
import ExamCreateScreen from '../ExamCreateSceen/ExamCreateScreen'
import ExamScoreSceen from '../ExamScoreSceen/ExamScoreSceen'
import ManageRoom from '../ManageRoom/ManageRoom'
import UserManage from '../UserManage/UserManage'
import YearAndTermManage from '../YearAndTermManage/YearAndTermManage'
import AddBuilding from '../AddBuilding/AddBuilding'
import AddSubject from '../AddSubject/AddSubject'
import CourseManage from '../CourseManage/courseManage'
import Examiner from '../ExaminerSchedule/examinerMain'
import AddCourse from '../CourseManage/AddCourse'
import AddCourseData from '../CourseManage/AddCourseData'

import '../../StyleSheets/mainScreen.css'
import '../../StyleSheets/pageHelper.css'

class MainScreen extends Component {
  render () {
    return (
      <div className="main-screen">
        <MainNavBar
          setUserAppAuth={this.props.setUserAppAuth}
          username={this.props.user.firstName}

          handleHamburger={() => { this.mainMenuBar.handleHamburger() }}
        />
        <MainMenuBar
          ref={instance => { this.mainMenuBar = instance }}
          user={this.props.user}
        />
        <div className="main-subcontent">
          <Route exact path="/" render={(props) =>
            <Home />
          } />
          <Route path="/exam_schedule" render={(props) =>
            <ExamSchedule
              user={this.props.user}
            />
          } />
          <Route path="/exam_create" render={(props) =>
            <ExamCreateScreen />
          } />
          <Route path="/user_manage" render={(props) =>
            <UserManage />
          } />
          <Route path="/exam_score" render={(props) =>
            <ExamScoreSceen />
          } />
          <Route path="/manage_room" render={(props) =>
            <ManageRoom />
          } />
          <Route path="/year_and_term_manage" render={(props) =>
            <YearAndTermManage />
          } />
          <Route path="/add_building" render={(props) =>
            <AddBuilding />
          } />
          <Route path="/add_subject" render={(props) =>
            <AddSubject />
          } />
          <Route path="/course_manage" render={(props) =>
            <CourseManage
              user={this.props.user}
            />
          } />
          <Route path="/examiner" render={(props) =>
            <Examiner
              username={this.props.user.username}
            />
          }/>
          <Route path="/add_course" render={(props) =>
            <AddCourse
              user={this.props.user}
            />
          } />
          <Route path="/add_course_data/:subjectId/:coruseId" render={(props) =>
            <AddCourseData />
          } />
        </div>
      </div>
    )
  }
}

export default MainScreen
