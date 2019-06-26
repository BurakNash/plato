import React, { Component } from "react";
import "./Teacher.css";

export default class TeacherForm extends Component {
  // Set initial state
  state = {
    teacherName: "",
    email: "",
    subjects: "",
    schoolId: "",
    position: "TEACHER",
    category: "teachers",
    classroomId: 1,
    saveEnabled: false
  };

  // Update state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  /*
        Local method for validation, creating teacher object, and
        invoking the function reference passed from parent component
     */
  constructNewTeacher = (evt) => {
    evt.preventDefault();
    if (this.state.school === "") {
      window.alert("Please select a teacher");
    } else {
      const teacher = {
        name: this.state.teacherName,
        email: this.state.email,
        subjects: this.state.subjects,
        // Make sure the teacherId is saved to the database as a number since it is a foreign key.
        schoolId: parseInt(this.state.schoolId),
        classroomId: parseInt(this.state.classroomId)
      };

      // Create the teacher and redirect user to teacher list
      this.props.addTeacher(teacher);

      this.setState({ saveEnabled: true });
    }
  };

  render() {
    return (
      <React.Fragment>
        <form className="inputteacher teacherForm">
          <div className="form-group">
            <label htmlFor="teacherName">Teacher name</label>
            <input
              type="text"
              required
              autoFocus
              className="form-control"
              onChange={this.handleFieldChange}
              id="teacherName"
              placeholder="Teacher name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="email"
              placeholder="Teacher Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="subjects">Subjects</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="subjects"
              placeholder="Subjects"
              value={this.state.subjects}
            />
          </div>
          <div className="form-group">
            <label htmlFor="school">Assign to a School</label>
            <select
              defaultValue=""
              name="school"
              id="schoolId"
              onChange={this.handleFieldChange}
            >
              <option value="">Select a School</option>
              {this.props.schools.map((e) => (
                <option key={e.id} id={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={
              !this.state.teacherName ||
              !this.state.email ||
              !this.state.subjects ||
              !this.state.schoolId ||
              this.state.saveEnabled
            }
            onClick={this.constructNewTeacher}
            className="btn btn-warning"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
