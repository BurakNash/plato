import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./Classrooms.css";


class ClassroomForm extends Component {
  state = {
    classroomName: "",
    position: "",
    category: "",
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
  constructNewClassroom = (evt) => {
    evt.preventDefault();
    if (this.state.classroomId === null) {
      window.alert("Please select a class");
    } else {
      const classroom = {
        name: this.state.classroomName,
        position: "CLASSROOM",
        category: "classrooms"
      };
      // {this.props.history.push("/students/new")};

      // Create the class and redirect user to class list
      this.props.addClassroom(classroom);
      this.props.history.push("/classrooms");
      window.location.reload()

      this.setState({ saveEnabled: true });
    }
  };

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <form className="inputclass classForm">
          <div className="classname form-group">
            
            <input
              type="text"
              required
              autoFocus
              className="inputsize form-control"
              onChange={this.handleFieldChange}
              id="classroomName"
              placeholder="Classroom name"
            />
          </div>

          <button
            type="button"
            disabled={!this.state.classroomName || this.state.saveEnabled}
            onClick={this.constructNewClassroom}
            className="submitnewclass btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default ClassroomForm;
