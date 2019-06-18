import React, { Component } from "react";
import { Link } from "react-router-dom";
class TeacherCard extends Component {
  render() {
    /* Reference Code
          const ownerStringArray = this.props.studentOwners
        .filter((ao) => ao.studentId === this.props.student.id)
        .map((ao) => this.props.owners.find((o) => o.id === ao.ownerId).name);
        */

    return (
    
        
          <div className="teacherlistname">
        <Link className="teacher-link" to={`/teachers/${this.props.teacher.id}`}>
                  {this.props.teacher.name} 
                </Link>
                </div>
        
      
    );
  }
}

export default TeacherCard;
