import React, { Component } from "./node_modules/react"
import "./Student.css"



export default class OwnerDetail extends Component {
    render() {
      
        const student = this.props.students.find(a =>
            a.id === parseInt(this.props.match.params.studentId))
             || {id:404, name:"404", grade: ""}

        return (
            <section className="student">
                <div key={student.id} className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            {student.name}
                        </h4>
                        <h6 className="card-title">{student.grade}</h6>
                        <button
                            onClick={() =>
                                this.props.dischargeStudent(student.id)
                                    .then(() => this.props.history.push("/students"))
                            }
                            className="card-link">Delete</button>
                    </div>
                </div>
            </section>
        )
    }
}