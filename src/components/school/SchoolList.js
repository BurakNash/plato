import React, { Component } from "react"
import { Link } from "react-router-dom";
import schools from "./schools.gif"
import "./School.css";

export default class SchoolList extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="schoolbox ">
      <img className="schoolgif" src={schools} alt=""></img>
      <section className="list ">
        {this.props.schools.map((business) => (
          <div key={business.id} className="card ">
            
            <div className="card-body">
              <h4 className="card-title ">
                <Link className="text-white" to={`/schools/${business.id}`}>
                  {business.name}
                  
                </Link>
              </h4>
            </div>
          </div>
        ))}
      </section>
      </div>
      
    );
  }
}
