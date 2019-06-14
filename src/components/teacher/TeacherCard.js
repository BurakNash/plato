import React, { Component } from "react";
//import { Link } from "react-router-dom";
class TeacherCard extends Component {
  render() {
    /* Reference Code
          const ownerStringArray = this.props.studentOwners
        .filter((ao) => ao.studentId === this.props.student.id)
        .map((ao) => this.props.owners.find((o) => o.id === ao.ownerId).name);
        */

    return (
      <React.Fragment>
        <div className="">
          <div className="studentcard" key={this.props.teacher.id}>
            <div className="studentname">{this.props.teacher.name}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TeacherCard;
