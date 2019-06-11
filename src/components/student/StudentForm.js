import React, { Component } from "react";
import "./Student.css";

export default class StudentForm extends Component {
  // Set initial state
  state = {
    studentName: "",
    grade: "",
    teacherId: "",
    saveEnabled: false
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  }

  /*
        Local method for validation, creating student object, and
        invoking the function reference passed from parent component
     */
  constructNewStudent = evt => {
    evt.preventDefault()
    if (this.state.teacher === "") {
      window.alert("Please select a teacher");
    } else {
      const student = {
        name: this.state.studentName,
        grade: this.state.grade,
        // Make sure the teacherId is saved to the database as a number since it is a foreign key.
        teacherId: parseInt(this.state.teacherId)
      }

      

      // Create the student and redirect user to student list
      this.props.addStudent(student);

      this.setState({ saveEnabled: true })
    }
  }

  render() {
    return (
      <React.Fragment>
        <form className="studentForm">
          <div className="form-group">
            <label htmlFor="studentName">Student name</label>
            <input
              type="text"
              required
              autoFocus
              className="form-control"
              onChange={this.handleFieldChange}
              id="studentName"
              placeholder="Student name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="grade">Grade</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="grade"
              placeholder="Student Grade"
            />
          </div>
          <div className="form-group">
            <label htmlFor="teacher">Assign to a Teacher</label>
            <select
              defaultValue=""
              name="teacher"
              id="teacherId"
              onChange={this.handleFieldChange}
            >
              <option value="">Select an teacher</option>
              {this.props.teachers.map(e => (
                <option key={e.id} id={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            onClick={this.constructNewStudent}
            disabled={this.state.saveEnabled}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}