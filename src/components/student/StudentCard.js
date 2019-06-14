import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Student.css";

class StudentCard extends Component {
  componentDidMount() {
  }

  render() {
    

    const ownerStringArray = this.props.studentOwners
      .filter((ao) => ao.studentId === this.props.student.id)
      .map((ao) => this.props.owners.find((o) => o.id === ao.ownerId).name);

    return (
      <React.Fragment>
        <div className="studentcard"
        key={this.props.student.id}>


          <div className="studentname">
              {this.props.student.name}
              ({ownerStringArray.join(", ")})
              <div className="buttons">
              <button
                type="button"
                className=""
                onClick={() => {
                  this.props.history.push(
                    `/students/${this.props.student.id}/edit`
                  );
                }}
              >
                Edit
              </button>
              <button
                onClick={() =>
                  this.props.deleteStudent(this.props.student.id)
                }
                className=""
              >
                Delete
              </button>
            
            <Link className="nav-link" to={`/students/${this.props.student.id}`}>
            Details
          </Link>
          </div>
          </div>
          </div>
          
        
        
      </React.Fragment>
    );
  }
}

export default StudentCard;
