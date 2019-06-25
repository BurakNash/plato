import React, { Component } from "react";

import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import OwnerManager from "../modules/OwnerManager";
import SchoolManager from "../modules/SchoolManager";
import TeacherManager from "../modules/TeacherManager";
import ClassManager from "../modules/ClassManager";

import ClassList from "./class/ClassList"

import StudentForm from "./student/StudentForm";
import StudentEditForm from "./student/StudentEditForm";
import StudentManager from "../modules/StudentManager";
import StudentList from "./student/StudentList";
import StudentDetail from "./student/StudentDetail";

import SchoolList from "./school/SchoolList";
import SchoolDetail from "./school/SchoolDetail";

import SearchResults from "./search/SearchResults";

import TeacherList from "./teacher/TeacherList";
import TeacherEditForm from "./teacher/TeacherEditForm";
import TeacherDetail from "./teacher/TeacherDetail";
import TeacherForm from "./teacher/TeacherForm";

import Login from "../users/Login";
import Register from "../users/Register";
import AuthRoute from "./auth/AuthRoute";
import "./App.css";

class ApplicationViews extends Component {
  state = {
    owners: [],
    studentOwners: [],
    teachers: [],
    students: [],
    schools: [],
    classes:[]
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
  deleteClass = (id) => {
    ClassManager.delete(id)
    //.then(this._redirectToStudentList);
  };

  addClass = async (student) => {
    await ClassManager.addClass(student);
    //this._redirectToStudentList();
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

  getOneTeacher = async () => {
    this.setState({ students: await TeacherManager.get() });
  };

  getAllClasses = async () => {
    this.setState({ classes: await ClassManager.getAll() });
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

    ClassManager.getAll()
    .then((classes) => (newState.classes = classes))
    .then((classes) => (newState.classes = classes))
    .then(() => ClassManager.getAll());

    SchoolManager.getAll()
      .then((schools) => (newState.schools = schools))
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

  isAuthenticated = () => sessionStorage.getItem("Fullname") !== null;

  render() {
    return (
      <React.Fragment>
        <AuthRoute
          path="/schools"
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
          teachers= {this.state.teachers}
        />
        <Route
          path="/classes"
          render={(props) => {
            return (
              <ClassList
                {...props}
                addClass={this.addClass}
                getAll={this.props.getAllClasses}
                classes= {this.state.classes}
                teachers= {this.state.teachers}
                students= {this.state.students}
              />
            );
          }}
        />

        <Route
          path="/register"
          render={(props) => {
            return (
              <Register
                {...props}
                addUser={this.props.addUser}
                users={this.props.users}
                registerIt={this.props.registerIt}
                getAll={this.props.getAllUsers}
              />
            );
          }}
        />
        <Route
          exact
          path="/"
          render={(props) => {
            return (
              <Login
                {...props}
                populateAppState={this.props.populateAppState}
                registerIt={this.props.registerIt}
              />
            );
          }}
        />
        <Route
          Exact
          path="/students/:studentId(\d+)"
          render={(props) => {
            if (this.isAuthenticated()) {
              const student = this.state.students.find(
                (a) => a.id === parseInt(props.match.params.studentId)
              ) || { id: 404, name: "404", grade: "Student not found" };

              return (
                <StudentDetail
                  {...props}
                  student={student}
                  deleteStudent={this.deleteStudent}
                  students={this.state.students}
                />
              );
            } else {
              return <Login />;
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
              return <Redirect to="/" />;
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
              return <Redirect to="/" />;
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
              return <Redirect to="/" />;
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
              return <Redirect to="/" />;
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
                  students={this.state.students}
                  schools={this.state.schools}
                />
              );
            } else {
              return <Redirect to="/" />;
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
                  schools={this.state.schools}
                  teachers={this.state.teachers}
                  loadTeachers={this.getAllTeachers}
                  {...props}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          exact
          path="/schools/:schoolId(\d+)"
          render={(props) => {
            if (this.isAuthenticated()) {
              return (
                <SchoolDetail
                  {...props}
                  schools={this.state.schools}
                  teachers={this.state.teachers}
                  students={this.state.students}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          path="/search"
          render={(props) => {
            if (this.isAuthenticated()) {
              return (
                <SearchResults
                  {...props}
                  {...this.props}
                  schools={this.state.schools}
                  teachers={this.state.teachers}
                  students={this.state.students}
                  //searchResults={this.props.searchResults}
                  //searchInput={this.props.searchInput}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);
