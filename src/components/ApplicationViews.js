import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import OwnerManager from "../modules/OwnerManager";
import SchoolManager from "../modules/SchoolManager";
import TeacherManager from "../modules/TeacherManager";

import StudentForm from "./student/StudentForm";
import StudentEditForm from "./student/StudentEditForm";
import StudentManager from "../modules/StudentManager";
import StudentList from "./student/StudentList";
import StudentDetail from "./student/StudentDetail";

import SchoolList from "./school/SchoolList";
import SchoolDetail from "./school/SchoolDetail";

import TeacherList from "./teacher/TeacherList";
import TeacherEditForm from "./teacher/TeacherEditForm";
import TeacherDetail from "./teacher/TeacherDetail";
import TeacherForm from "./teacher/TeacherForm";

import Login from "./auth/Login";
import AuthRoute from "./auth/AuthRoute";

class ApplicationViews extends Component {
  state = {
    owners: [],
    studentOwners: [],
    teachers: [],
    students: [],
    schools: []
  };

  _redirectToStudentList = async () => {
    const students = await StudentManager.getAll();
    this.props.history.push("/students");
    this.setState({ students: students });
  };
  _redirectToTeacherList = async () => {
    const teachers = await TeacherManager.getAll();
    this.props.history.push("/teachers");
    this.setState({ teachers: teachers });
  };

  deleteStudent = (id) => {
    StudentManager.delete(id).then(this._redirectToStudentList);
  };

  deleteTeacher = async (id) => {
    await TeacherManager.delete(id).then(this._redirectToTeacherList);
  };

  addStudent = async (student) => {
    await StudentManager.addStudent(student);
    this._redirectToStudentList();
  };

  addTeacher = async (teacher) => {
    await TeacherManager.addTeacher(teacher);
    this._redirectToTeacherList();
  };

  updateStudent = async (student) => {
    await StudentManager.updateStudent(student);
    this._redirectToStudentList();
  };

  updateTeacher = async (teacher) => {
    await TeacherManager.updateTeacher(teacher);
    this._redirectToTeacherList();
  };

  getAllSchools = async () => {
    this.setState({ students: await SchoolManager.getAll() });
  };

  getAllStudents = async () => {
    this.setState({ students: await StudentManager.getAll() });
  };
  getAllTeachers = async () => {
    this.setState({ teachers: await TeacherManager.getAll() });
  };

  componentDidUpdate() {}

  componentDidMount() {
    const newState = {};

    SchoolManager.getAll().then((schools) => (newState.schools = schools))
    .then((schools) => (newState.schools = schools))
    .then(() => SchoolManager.getAll());

    TeacherManager.getAll()
      .then((teachers) => (newState.teachers = teachers))
      .then(() => SchoolManager.getAll())
      .then((schools) => (newState.schools = schools));

    StudentManager.getAll()
      .then((students) => (newState.students = students))
      .then(() => TeacherManager.getAll())
      .then((teachers) => (newState.teachers = teachers))
      .then(() => SchoolManager.getAll())
      .then((schools) => (newState.schools = schools))

      //OWNERS
      .then(() => OwnerManager.getAll())
      .then((owners) => (newState.owners = owners))
      .then(() =>
        fetch("http://localhost:5002/studentOwners").then((r) => r.json())
      )
      .then((studentOwners) => (newState.studentOwners = studentOwners))
      .then(() => this.setState(newState));
  }

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  render() {
    return (
      <React.Fragment>
        <Route path="/login" component={Login} />

        {/*Authroute: function to route only authorized users
        *See auth folder */}
        <AuthRoute
          path="/"
          Destination={SchoolList}
          schools={this.state.schools}
        />

        <AuthRoute
          path="/students"
          Destination={StudentList}
          owners={this.state.owners}
          students={this.state.students}
          studentOwners={this.state.studentOwners}
          deleteStudent={this.deleteStudent}
          loadStudents={this.getAllStudents}
        />
        <Route
          path="/students/:studentId(\d+)"
          render={(props) => {
            if (this.isAuthenticated()) {
              const student = this.state.students.find(
                (a) => a.id === parseInt(props.match.params.studentId)
              ) || { id: 404, name: "404", grade: "Student not found" };

              return (
                <StudentDetail
                  student={student}
                  deleteStudent={this.deleteStudent}
                />
              );
            } else {
              return <Login />;
            }
          }}
        />

        <Route
          path="/students/:studentId(\d+)/edit"
          render={(props) => {
            if (this.isAuthenticated()) {
              return (
                <StudentEditForm
                  {...props}
                  teachers={this.state.teachers}
                  updateStudent={this.updateStudent}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

        <Route
          path="/students/new"
          render={(props) => {
            if (this.isAuthenticated()) {
              return (
                <StudentForm
                  {...props}
                  addStudent={this.addStudent}
                  teachers={this.state.teachers}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          path="/teachers/new"
          render={(props) => {
            if (this.isAuthenticated()) {
              return (
                <TeacherForm
                  {...props}
                  addTeacher={this.addTeacher}
                  schools={this.state.schools}
                  teachers={this.state.teachers}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route
          path="/teachers/:teacherId(\d+)/edit"
          render={(props) => {
            if (this.isAuthenticated()) {
              return (
                <TeacherEditForm
                  {...props}
                  schools={this.state.schools}
                  updateTeacher={this.updateTeacher}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

        <Route
          exact
          path="/teachers"
          render={(props) => {
            if (this.isAuthenticated()) {
              return (
                <TeacherList
                  students={this.state.students}
                  schools={this.state.schools}
                  teachers={this.state.teachers}
                  owners={this.state.owners}
                  studentOwners={this.state.studentOwners}
                  loadTeachers={this.getAllTeachers}
                  {...props}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

        <Route
          exact
          path="/teachers/:teacherId(\d+)"
          render={(props) => {
            if (this.isAuthenticated()) {
              return (
                <TeacherDetail
                  {...props}
                  deleteTeacher={this.deleteTeacher}
                  teachers={this.state.teachers}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

        <Route
          exact
          path="/schools/:schoolId(\d+)"
          render={(props) => {
            if (this.isAuthenticated()) {
              return <SchoolDetail {...props} 
              schools={this.state.schools} 
              teachers={this.state.teachers}
              
              
              />;



            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);
