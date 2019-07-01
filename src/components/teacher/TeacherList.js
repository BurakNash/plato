import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./TeacherList.css";
import "./Teacher.css";

import teachers from "./teachers.gif";

class TeacherList extends Component {
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <React.Fragment>
        <div className="centerChildren">
          <img className="teachergif" src={teachers} alt="" />
          <div>
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => {
                this.props.history.push("/teachers/new");
              }}
            >
              Add a New Teacher
            </button>
          </div>
        </div>

        <section className="list-group-item bg-transparent">
          {this.props.teachers.map((teacher) => (
            <div key={`teacher-${teacher.id}`} teacher={teacher}>
              <div className="teacherlistname">
                <Link className="teacher-link" to={`/teachers/${teacher.id}`}>
                  {teacher.name} ({teacher.school.name})
                </Link>
              </div>
            </div>
          ))}
        </section>
      </React.Fragment>
    );
  }
}

export default TeacherList;
