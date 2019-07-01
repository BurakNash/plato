import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Classrooms.css";

class ClassroomAssignments extends Component {
  state = {
    classroomId: "",
    teacherId: "",

    saveEnabled: false
  };
  state = {
    studentId: "",
    classroomId: "",
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

  constructNewClassroomStudent = (evt) => {
    evt.preventDefault();
    if (this.state.classroomId === null) {
      window.alert("Please select a class");
    } else {
      const classroomStudent = {
        studentId: parseInt(this.state.studentId),
        classroomId: parseInt(this.props.match.params.classroomId)
      };

      this.props.addClassroomStudent(classroomStudent);
      this.props.loadClassroomStudents();

      //this.props.history.push("/classrooms");
      //window.location.href = "/classrooms";
      this.setState({ saveEnabled: true });
    }
  };

  constructNewClassroomTeacher = (evt) => {
    //evt.preventDefault();
    if (this.state.classroomId === null) {
      window.alert("Please select a class");
    } else {
      const classroomTeacher = {
        teacherId: parseInt(this.state.teacherId),
        classroomId: parseInt(this.props.match.params.classroomId)
      };

      this.props.addClassroomTeacher(classroomTeacher);

      //this.props.history.push("/classrooms");
      //window.location.href = "/classrooms";
      this.setState({ saveEnabled: true });
    }
  };

  componentDidMount() {}

  render() {
    const classroom = this.props.classrooms.find(
      (a) => a.id === parseInt(this.props.match.params.classroomId)
    ) || { id: 404, name: "404", grade: "Teacher not found" };

    return (
      <React.Fragment>
        <div className="classdetails">
          <h2>
            {classroom.name}
            <span
              className="octicon  octicon-trashcan"
              onClick={
                () => this.props.deleteClassroom(classroom.id)
                //.then(() => this.props.history.push("/clasrooms"))
              }
            />
          </h2>
          <h5>Room: {classroom.room}</h5>
          <h5>Days :{classroom.days}</h5>
          <h5 className="classdetails">Hours : {classroom.hours}</h5>
        </div>

        <div className="row">
          <div className="column">
            <div className="">
              <h4>Assign Teachers</h4>
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

            <div className="alignlefttselect">
              <h3>Teachers Assigned</h3>
              {this.props.classroomTeachers
                .filter((ct) => ct.classroomId === classroom.id)
                .map((ct) => (
                  <div
                    className="studentcard"
                    key={ct.id}
                    id={ct.id}
                    value={ct.id}
                    history={this.props.history}
                  >
                    <div className="studentname">
                      <Link
                        className=""
                        to={`/teachers/${ct.teacherId}`}
                      >
                        {ct.teacher.name}
                      </Link>

                      <div className="buttons">
                        <button
                          onClick={() =>
                            this.props.deleteClassroomTeacher(ct.id)
                          }
                          className=""
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className=" column">
            <h4>Assign Students</h4>
            <select
              className=" selectlist"
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

            <div className="alignright ">
              <h3>Students Assigned</h3>
              {this.props.classroomStudents
                .filter((ct) => ct.classroomId === classroom.id)
                .map((ct) => (
                  <div
                    className="studentcard"
                    key={ct.id}
                    id={ct.id}
                    value={ct.id}
                    history={this.props.history}
                  >
                    <div className="studentname">
                      <Link
                        className=""
                        to={`/students/${ct.studentId}`}
                      >
                        {ct.student.name}
                      </Link>

                      <div className="buttons">
                        <button
                          onClick={() =>
                            this.props.deleteClassroomStudent(ct.id)
                          }
                          className=""
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ClassroomAssignments;
