import React, { Component } from "react"
import StudentManager from "../../modules/StudentManager"

export default class StudentEditForm extends Component {
    // Set initial state
    state = {
      studentName: "",
      grade: "",
      teacherId: ""
    }


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingStudent = evt => {
      evt.preventDefault()

      if (this.state.teacher === "") {
        window.alert("Please select a teacher");
      } else {
        const editedStudent = {
          id: this.props.match.params.studentId,
          name: this.state.studentName,
          grade: this.state.grade,
          teacherId: parseInt(this.state.teacherId)
        };

        this.props.updateStudent(editedStudent)
            .then(() => this.props.history.push("/students"))
    }
  }

    componentDidMount() {
      StudentManager.get(this.props.match.params.studentId)
      .then(student => {
        this.setState({
          studentName: student.name,
          grade: student.grade,
          teacherId: student.teacherId
        });
      });
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
                className="form-control"
                onChange={this.handleFieldChange}
                id="studentName"
                value = {this.state.studentName}
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
                value = {this.state.grade}
              />
            </div>
            <div className="form-group">
              <label htmlFor="teacher">Assign to a Teacher</label>
              <select
                name="teacher"
                id="teacherId"
                onChange={this.handleFieldChange}
                value = {this.state.teacherId}
              >
                <option value="undefined">Select an teacher</option>
                {this.props.teachers.map(e => (
                  <option key={e.id} id={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              onClick={this.updateExistingStudent}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </React.Fragment>
      );
    }
}