import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Classrooms.css";

//import ClassroomForm from "./ClassroomForm";

class ClassroomList extends Component {
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <React.Fragment>
        <center>
          <h2>Classrooms</h2>

          <button
            type="button"
            className="addnewclass btn btn-warning"
            onClick={() => {
              this.props.history.push("/classrooms/new");
            }}
          >
            Add a New Classroom
          </button>
        </center>
        <div className="right list-group-item bg-transparent">
          {this.props.classrooms.map((business) => (
            <div key={`classroom-${business.id}`} classroom={business}>
              <div className="teacherlistname">
                <Link className="teacher-link" to={`/classrooms/${business.id}`}>
                  {business.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
       
      </React.Fragment>
    );
  }
}

export default ClassroomList;
