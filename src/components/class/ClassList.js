import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Classes.css";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import ClassForm from "./ClassForm";

class ClassList extends Component {
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
              this.props.history.push("/classes/new");
            }}
          >
            Add a New Class
          </button>
        </center>
        <div className="right list-group-item bg-transparent">
          {this.props.classes.map((business) => (
            <div key={`class-${business.id}`} class={business}>
              <div className="teacherlistname">
                <Link className="teacher-link" to={`/classes/${business.id}`}>
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

export default ClassList;
