import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./Classrooms.css";

class ClassroomForm extends Component {
  state = {
    //schoolId:"",
    teacherId: "",

    saveEnabled: false
  };


  // Update state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  /*
            Local method for validation, creating class object, and
            invoking the function reference passed from parent component
         */
  constructNewClassroomTeacher = (evt) => {
    evt.preventDefault();
    if (this.state.classroomId === null) {
      window.alert("Please select a class");
    } else {
      const classroomTeacher = {
        teacherId: parseInt(this.state.teacherId)
        //schoolId: parseInt(this.state.schoolId)
      };

      this.props.addClassroomTeacher(classroomTeacher);
      this.props.loadClassroomTeachers();

      //this.props.history.push("/classrooms");
      //window.location.href = "/classrooms";
      this.setState({ saveEnabled: true });
    }
  };

  constructNewClassroomStudent = (evt) => {
    evt.preventDefault();
    if (this.state.classroomId === null) {
      window.alert("Please select a class");
    } else {
      const classroomStudent = {
        studentId: parseInt(this.state.studentId)
        //schoolId: parseInt(this.state.schoolId)
      };

      this.props.addClassroomStudent(classroomStudent);
      this.props.loadClassroomStudents();

      //this.props.history.push("/classrooms");
      //window.location.href = "/classrooms";
      this.setState({ saveEnabled: true });
    }
  };

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <form className="inputclass classForm">
          <div className="form-group">
            <h4>Assign to a Teacher</h4>
            <select
              className="selectlist"
              multiple={true}
              value={this.props.value}
              name="teacher"
              id="teacherId"
              onChange={this.handleFieldChange}
            >
              {this.props.teachers.map((e) => (
                <option
                  onDoubleClick={this.constructNewClassroomTeacher}
                  key={e.id}
                  id={e.id}
                  value={e.id}
                >
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <h4>Assign to a Teacher</h4>
            <select
              className="selectlist"
              multiple={true}
              value={this.props.value}
              name="classroomTeacher"
              id="classroomTeacherId"
              onChange={this.handleFieldChange}
            >
              {this.props.classroomTeachers.map((e) => (
                <option
                  onDoubleClick={this.constructNewClassroomTeacher}
                  key={e.id}
                  id={e.id}
                  value={e.id}
                >
                  {e.teacher.name}
                </option>
              ))}
            </select>
          </div>

          {/*--------------------------*/}

          <div className="form-group">
            <h4>Assign to a Student</h4>
            <select
              className="selectlist"
              multiple={true}
              value={this.props.value}
              name="student"
              id="studentId"
              onChange={this.handleFieldChange}
            >
              {this.props.students.map((e) => (
                <option
                  onDoubleClick={this.constructNewClassroomStudent}
                  key={e.id}
                  id={e.id}
                  value={e.id}
                >
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <h4>Assign to a Student</h4>
            <select
              className="selectlist"
              multiple={true}
              value={this.props.value}
              name="classroomStudent"
              id="classroomStudentId"
              onChange={this.handleFieldChange}
            >
              {this.props.classroomStudents.map((e) => (
                <option
                  onDoubleClick={this.constructNewClassroomStudent}
                  key={e.id}
                  id={e.id}
                  value={e.id}
                >
                  {e.student.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            disabled={!this.state.studentId || this.state.saveEnabled}
            onClick={this.constructNewClassroom}
            className="submitnewclass btn btn-primary"
            href="/classrooms"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default ClassroomForm;