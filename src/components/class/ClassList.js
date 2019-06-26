import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Classes.css";



class ClassList extends Component {
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <React.Fragment>
        <div className="centerChildren">
          
          <div>
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => {
                this.props.history.push("/classes/new");
              }}
            >
              Add a New Class
            </button>
          </div>
        </div>

        <section className="list-group-item bg-transparent" >
          {this.props.classes.map((business) => (
            <div key={`class-${business.id}`} class={business}>
              <div className="teacherlistname">
                <Link className="teacher-link" to={`/classes/${business.id}`}>
                  {business.name} 
                </Link>
              </div>
            </div>
          ))}
        </section>
      </React.Fragment>
    );
  }
}

export default ClassList;
