import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./Classrooms.css";

class ClassroomAssignment extends Component {
  constructor(props) {
    super(props);
    //this.state = {value: 'coconut'};
    this.state = { value: ["coconut"] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //this.setState({value: event.option});
    this.setState({
      value: Array.from(event.target.selectedOptions, (item) => item.value)
    });
  }

  handleSubmit(event) {
    alert("Your favorite flavor is: " + this.state.value);
    event.preventDefault();
  }

  componentDidMount() {}

  render() {

    const classroom = this.props.classrooms.find(
      (a) => a.id === parseInt(this.props.match.params.classroomId)
    ) || { id: 404, name: "404", grade: "School not found" };

    return (
      <React.Fragment>
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
              <option key={e.id} id={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        <div className="">
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
              <option key={e.id} id={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        <div className="">
          <h4>Assign to a Student</h4>
          <select
            className="selectlist"
            multiple={true}
            value={this.props.value}
            name="student"
            id="studentId"
            onChange={this.handleFieldChange}
          >
            {this.props.teachers
              .filter((e) => e.classroomId === classroom.id)
              .map((e) => (
                <option key={e.id} teacher={e} id={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
          </select>
        </div>
        <div className="">
          <h4>Assign to a Student</h4>
          <select
            className="selectlist"
            multiple={true}
            value={this.props.value}
            name="student"
            id="studentId"
            onChange={this.handleFieldChange}
          >
            {this.props.students
              .filter((e) => e.classroomId === classroom.id)
              .map((e) => (
                <option key={e.id} student={e} id={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
          </select>
        </div>
      </React.Fragment>
    );
  }
}

export default ClassroomAssignment;
