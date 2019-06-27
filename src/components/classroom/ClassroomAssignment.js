import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./Classrooms.css";
//import StudentManager from "../../modules/StudentManager";


class ClassroomAssignment extends Component {
  state = {
    classroomName: "",
    teacherId: "",
    studentId: "",
    saveEnabled: false
  };

  // Update state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };


  constructNewClassroom = (evt) => {
    evt.preventDefault();
    
      const classroom = {
        name: this.state.teacherName,
        teacherId: parseInt(this.state.teacherId),
        studentId: parseInt(this.state.studentId),
        
      };

      // Create the teacher and redirect user to teacher list
      this.props.addClassroom(classroom);

      this.setState({ saveEnabled: true });
    
  };

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

  componentDidMount() {
    
  }

  render() {

    const classroom = this.props.classrooms.find(
      (a) => a.id === parseInt(this.props.match.params.classroomId)
    );

    return (
      <React.Fragment>
        <button
            type="button"
            
            onClick={this.constructNewClassroom}
            className="submitnewclass btn btn-primary"
            
          >
            Submit
          </button>
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
          <h4>Assign to a Teacher</h4>
          <select
            className="selectlist"
            multiple={true}
            value={this.props.value}
            name="teacher"
            id="teacherId"
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
