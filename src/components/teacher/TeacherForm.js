import React, { Component } from "react";

class TeacherForm extends Component {
  state = {
    name: "",
    email: "",
    subjects: "",
    school: ""
  };
  handelFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };
  ConstructTeacher = (evt) => {
    evt.preventDefault();
    const teachers = {
      name: this.state.name,
      email: this.state.email,
      date: this.state.subjects,
      schoolId: parseInt(this.state.schoolId)
    };
    this.props
      .addTeacher(teachers)
      .then(() => this.props.history.push("/teachers"));
  };

  render() {
    return (
      <>
        <form>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              required
              onChange={this.handelFieldChange}
              id="name"
              placeholder="name"
            />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              required
              onChange={this.handelFieldChange}
              id="email"
              placeholder="email"
            />
          </div>
          <div>
            <label htmlFor="subjects">Subjects</label>
            <input
              type="text"
              required
              onChange={this.handelFieldChange}
              id="subjects"
              placeholder="subjects"
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
            className="primary"
            type="submit"
            onClick={this.ConstructTeacher}
          >
            Add New Teacher
          </button>
        </form>
      </>
    );
  }
}

export default TeacherForm;
