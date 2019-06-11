import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Location.css";

export default class LocationList extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <section className="list">
        {this.props.locations.map((business) => (
          <div key={business.id} className="card ">
            <div className="card-body">
              <h4 className="card-title">
                <Link className="nav-link" to={`/locations/${business.id}`}>
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
