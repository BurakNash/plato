import React, { Component } from "react";
import "./StudentList.css";
import StudentCard from "./StudentCard";

class StudentList extends Component {
  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
  }
  render() {
    return (
      <React.Fragment>
        <div className="centerChildren">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push("/students/new");
            }}
          >
            Add a New Student
          </button>
        </div>
        <article className="students">
          {this.props.students.map((student) => (
            <StudentCard
              key={`student-${student.id}`}
              student={student}
              dischargeStudent={this.props.dischargeStudent}
              owners={this.props.owners}
              studentOwners={this.props.studentOwners}
              history={this.props.history}
            />
          ))}
        </article>
      </React.Fragment>
    );
  }
}

export default StudentList;
