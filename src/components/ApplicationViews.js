import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import StudentList from "./student/StudentList";
import SchoolList from "./school/SchoolList";
import SchoolDetail from "./school/SchoolDetail";
import TeacherList from "./teacher/TeacherList";
import TeacherEditForm from "./teacher/TeacherEditForm";

import StudentDetail from "./student/StudentDetail";
import TeacherDetail from "./teacher/TeacherDetail";
import TeacherForm from "./teacher/TeacherForm";

import StudentManager from "../modules/StudentManager";
import OwnerManager from "../modules/OwnerManager";
import SchoolManager from "../modules/SchoolManager";
import TeacherManager from "../modules/TeacherManager";
import StudentForm from "./student/StudentForm";
import StudentEditForm from "./student/StudentEditForm";
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

  dischargeStudent = (id) => {
    StudentManager.delete(id).then(this._redirectToStudentList);
  };

  addStudent = async (student) => {
    await StudentManager.addStudent(student);
    this._redirectToStudentList();
  };

  updateStudent = async (student) => {
    await StudentManager.updateStudent(student);
    this._redirectToStudentList();
  };
  addTeacher = async (teacher) => {
    await TeacherManager.addTeacher(teacher);
    this._redirectToTeacherList();
  };
  updateTeacher = async (teacher) => {
    await TeacherManager.updateTeacher(teacher);
    this._redirectToTeacherList();
  };

  fireTeacher = async (id) => {
    await TeacherManager.delete(id);
    const teachers = await TeacherManager.getAll();
    this.setState({ teachers: teachers });
  };

  getAllStudents = async () => {
    this.setState({ students: await StudentManager.getAll() });
  };
  getAllTeachers = async () => {
    this.setState({ teachers: await TeacherManager.getAll() });
  };

  componentDidUpdate() {
  }

  componentDidMount() {
    const newState = {};

    TeacherManager.getAll()
      .then((teachers) => (newState.teachers = teachers))

    StudentManager.getAll()
      .then((students) => (newState.students = students))
      .then(() => TeacherManager.getAll())
      .then((teachers) => (newState.teachers = teachers))
      .then(() => SchoolManager.getAll())
      .then((schools) => (newState.schools = schools))
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
          dischargeStudent={this.dischargeStudent}
          loadStudents={this.getAllStudents}
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
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
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
                  dischargeStudent={this.dischargeStudent}
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
              return <TeacherForm {...props} addTeacher={this.addTeacher} 
              schools={this.state.schools}
              teachers={this.state.teachers}/>;
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
                  teachers={this.state.teachers}
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
                  fireTeacher={this.fireTeacher}
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
                  fireTeacher={this.fireTeacher}
                  teachers={this.state.teachers}
                />
              );
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
