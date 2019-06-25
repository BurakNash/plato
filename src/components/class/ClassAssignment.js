import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./Classes.css";

class ClassAssignment extends Component {
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
    return (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor="teacher">Assign to a Teacher</label>
          <select
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

        <div className="form-group">
          <label htmlFor="student">Assign to a Student</label>
          <select
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
      </React.Fragment>
    );
  }
}

export default ClassAssignment;
