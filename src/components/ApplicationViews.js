import React, { Component } from "react";

import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import OwnerManager from "../modules/OwnerManager";
import SchoolManager from "../modules/SchoolManager";
import TeacherManager from "../modules/TeacherManager";
import ClassroomManager from "../modules/ClassroomManager";
import ClassroomTeacherManager from "../modules/ClassroomTeacherManager";
import ClassroomStudentManager from "../modules/ClassroomStudentManager";

import ClassroomList from "./classroom/ClassroomList";
import ClassroomForm from "./classroom/ClassroomForm";
import ClassroomAssignment from "./classroom/ClassroomAssignment";

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
    classrooms: [],
    classroomTeachers: [],
    classroomStudents: []
  };
  _redirectToClassroomList = async () => {
    const classrooms = await ClassroomManager.getAll();
    this.props.history.push("/classrooms");
    this.setState({ classrooms: classrooms });
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
  deleteClassroomTeacher = async (id) => {
    await ClassroomTeacherManager.delete(id).then(this.getAllClassroomTeachers);
  };
  deleteClassroomStudent = async (id) => {
    await ClassroomStudentManager.delete(id).then(this.getAllClassroomStudents);
  };
  deleteClassroom = (id) => {
    ClassroomManager.delete(id);
    //.then(this._redirectToStudentList);
  };

  addClassroom = async (classroom) => {
    await ClassroomManager.addClassroom(classroom);
    this._redirectToClassroomList();
  };

  addClassroomTeacher = async (classroomTeacher) => {
    await ClassroomTeacherManager.addClassroomTeacher(classroomTeacher).then(
      this.getAllClassroomTeachers
    );
  };

  addClassroomStudent = async (classroomStudent) => {
    await ClassroomStudentManager.addClassroomStudent(classroomStudent).then(
      this.getAllClassroomStudents
    );
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

  updateClassroomTeacher = async (student) => {
    await ClassroomManager.updateClassroomTeacher(student);
    //this._redirectToStudentList();
  };

  updateClassroomStudent = async (student) => {
    await ClassroomManager.updateClassroomStudent(student);
    //this._redirectToStudentList();
  };

  updateTeacher = async (teacher) => {
    await TeacherManager.updateTeacher(teacher);
    this._redirectToTeacherList();
  };

  getOneTeacher = async () => {
    this.setState({ teachers: await TeacherManager.get() });
  };
  getOneStudent = async () => {
    this.setState({ students: await StudentManager.get() });
  };

  getAllClassrooms = async () => {
    this.setState({ classrooms: await ClassroomManager.getAll() });
  };

  getAllClassroomTeachers = async () => {
    this.setState({
      classroomTeachers: await ClassroomTeacherManager.getAll()
    });
  };

  getAllClassroomStudents = async () => {
    this.setState({
      classroomStudents: await ClassroomStudentManager.getAll()
    });
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

    ClassroomManager.getAll().then(
      (classrooms) => (newState.classrooms = classrooms)
    );

    ClassroomTeacherManager.getAll().then(
      (classroomTeachers) => (newState.classroomTeachers = classroomTeachers)
    );

    ClassroomStudentManager.getAll().then(
      (classroomStudents) => (newState.classroomStudents = classroomStudents)
    );

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
          teachers={this.state.teachers}
        />
        <AuthRoute
          path="/classrooms"
          Destination={ClassroomList}
          classrooms={this.state.classrooms}
          classroomTeachers={this.state.classroomTeachers}
          classroomStudents={this.state.classroomStudents}
          addClassroom={this.addClassroom}
          deleteClassroomTeacher={this.deleteClassroomTeacher}
          loadClassrooms={this.getAllClassrooms}
          students={this.state.students}
          teachers={this.state.teachers}
          schools={this.state.schools}
          addClassroomTeacher={this.addClassroomTeacher}
          loadClassroomTeachers={this.getAllClassroomTeachers}
          addClassroomStudent={this.addClassroomStudent}
          loadClassroomStudents={this.getAllClassroomStudents}
        />

        <AuthRoute
          path="/classrooms/new"
          Destination={ClassroomForm}
          classrooms={this.state.classrooms}
          classroomTeachers={this.state.classroomTeachers}
          addClassroom={this.addClassroom}
          addClassroomTeacher={this.addClassroomTeacher}
          loadClassroomTeachers={this.getAllClassroomTeachers}
          classroomStudents={this.state.classroomStudents}
          addClassroomStudent={this.addClassroomStudent}
          loadClassroomStudents={this.getAllClassroomStudents}
          deleteClassroomTeacher={this.deleteClassroomTeacher}
          teachers={this.state.teachers}
          students={this.state.students}
          schools={this.state.schools}
        />



<Route
          Exact
          path="/classrooms/:classroomId(\d+)"
          render={(props) => {
            if (this.isAuthenticated()) {
              return (
                <ClassroomAssignment
                  {...props}
                  classrooms={this.state.classrooms}
                  classroomTeachers={this.state.classroomTeachers}
                  addClassroomTeacher={this.addClassroomTeacher}
                  loadClassroomTeachers={this.getAllClassroomTeachers}
                  classroomStudents={this.state.classroomStudents}
                  deleteClassroomTeacher={this.deleteClassroomTeacher}
                  deleteClassroomStudent={this.deleteClassroomStudent}
                  addClassroomStudent={this.addClassroomStudent}
                  loadClassroomStudents={this.getAllClassroomStudents}
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
