import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Student.css";

class StudentCard extends Component {
  componentDidMount() {}

  render() {
    /* Reference Code
      const ownerStringArray = this.props.studentOwners
    .filter((ao) => ao.studentId === this.props.student.id)
    .map((ao) => this.props.owners.find((o) => o.id === ao.ownerId).name);
    */

    return (
      <React.Fragment>
        <section className="">
          <div className="teacherlistname" key={this.props.student.id}>
            <div className="">
              <Link
                className="teacher-link"
                to={`/students/${this.props.student.id}`}
              >
                {this.props.student.name}
              </Link>
            </div>
          </div>

          {/*
              ({ownerStringArray.join(", ")}) */}
        </section>
      </React.Fragment>
    );
  }
}

export default StudentCard;
