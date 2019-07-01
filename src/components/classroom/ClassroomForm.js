import React, { Component } from "react";

export default class ClassroomForm extends Component {
  // Set initial state
  state = {
    classroomName: "",
    room: "",
    days: "",
    hours: "",
    position: "CLASSROOM",
    category: "classrooms",
    saveEnabled: false
  };

  // Update state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  /*
        Local method for validation, creating student object, and
        invoking the function reference passed from parent component
     */
  constructNewClassroom = (evt) => {
    evt.preventDefault();
    if (this.state.teacherId === null) {
      window.alert("Please select a teacher");
    } else {
      const classroom = {
        name: this.state.classroomName,
        room: this.state.room,
        days: this.state.days,
        hours: this.state.hours,
        position: "CLASSROOM",
        category: "classrooms"
      };

      // Create the student and redirect user to student list
      this.props.addClassroom(classroom);

      this.setState({ saveEnabled: true });
    }
  };

  render() {
    return (
      <React.Fragment>
        <form className="inputstudent studentForm">
          <div className="form-group">
            <label htmlFor="classroomName">Classroom name</label>
            <input
              type="text"
              required
              autoFocus
              onChange={this.handleFieldChange}
              className="form-control"
              id="classroomName"
              placeholder="Classroom name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="room">Room</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="room"
              placeholder="Classroom room"
            />
          </div>
          <div className="form-group">
            <label htmlFor="days">Meeting Days</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="days"
              placeholder="Meeting Days"
            />
          </div>
          <div className="form-group">
            <label htmlFor="hours">Meeting Hours</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="hours"
              placeholder="Meeting Hours"
            />
          </div>

          <button
            type="button"
            disabled={
            !this.state.classroomName||
            !this.state.room ||
            !this.state.days||
            !this.state.hours ||
            this.state.saveEnabled
            }
            onClick={this.constructNewClassroom}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
