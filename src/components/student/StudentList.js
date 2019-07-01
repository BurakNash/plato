import React, { Component } from "react";
import "./StudentList.css";
import StudentCard from "./StudentCard";
import students from "./students.gif";
//import Octicon from 'react-octicon'

class StudentList extends Component {
  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
  }
  render() {
    return (
      <React.Fragment>
        <div className="centerChildren">
        <img className="schoolgif" src={students} alt=""></img>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => {
              this.props.history.push("/students/new");
            }}
          >
            Add a New Student
          </button>
        </div>
        <article className="list-group-item bg-transparent">
          {this.props.students.map((student) => (
            <StudentCard
              key={`student-${student.id}`}
              student={student}
              deleteStudent={this.props.deleteStudent}
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
