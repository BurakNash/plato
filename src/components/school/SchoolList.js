import React, { Component } from "react"
import { Link } from "react-router-dom";

import "./School.css";

export default class SchoolList extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <section className="list">
        {this.props.schools.map((business) => (
          <div key={business.id} className="card ">
            <div className="card-body">
              <h4 className="card-title">
                <Link className="nav-link" to={`/schools/${business.id}`}>
                  {business.name}
                </Link>
              </h4>
            </div>
          </div>
        ))}
      </section>
    );
  }
}
