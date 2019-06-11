import React, { Component } from "react"
import "../student/Student.css"

//import StudentCard from '../student/StudentCard';


export default class TeacherDetail extends Component {
    render() {

        const teacher = this.props.teachers.find(a =>
            a.id === parseInt(this.props.match.params.teacherId))
             || {id:404, name:"404", grade: "Teacher not found"}

        return (
            <section className="student">
                <div key={teacher.id} className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            {teacher.name}
                        </h4>
                        
                        <button
                            onClick={() =>
                                this.props.fireTeacher(teacher.id)
                                    .then(() => this.props.history.push("/teachers"))
                            }
                            
                            
                            className="card-link">Fire the Teacher</button>
                                <div className="">
                                
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}