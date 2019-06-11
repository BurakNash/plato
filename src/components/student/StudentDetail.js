import React, { Component } from "react"
import "./Student.css"
//import { Link } from "react-router-dom";


export default class StudentDetail extends Component {
    state = {
        saveDisabled: false
    }
   
    render() {
        //const teacher = this.props.teachers.find(a =>
           // a.id === parseInt(this.props.match.params.teacherId))
            
        return (
            <section className="student">
                <div key={this.props.student.id} className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            
                            {this.props.student.name}
                        </h4>
                        <h6 className="card-title">Student Grade: {this.props.student.grade}</h6>
                        <h6 className="card-title">Assigned Teachers: {}</h6>
                        <button
                            onClick={
                                () => {
                                    this.setState(
                                        { saveDisabled: true },
                                        () => this.props.dischargeStudent(this.props.student.id)
                                    )

                                }
                            }
                            
                            disabled={ this.state.saveDisabled }
                            className="deletedetails"><b>Delete:</b> {this.props.student.name}</button>
                    </div>
                </div>
            </section>
        )
    }
}