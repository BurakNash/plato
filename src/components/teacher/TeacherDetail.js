import React, { Component } from "react";
import "../teacher/Teacher.css";

//import StudentCard from '../student/StudentCard';

export default class TeacherDetail extends Component {
  render() {
    const teacher = this.props.teachers.find(
      (a) => a.id === parseInt(this.props.match.params.teacherId)
    ) || { id: 404, name: "404", grade: "Teacher not found" };

    return (
      <section className="student">
        <div key={teacher.id} className="card">
          <div className="card-body">
            <h4 className="card-title">{teacher.name}</h4>
            <h6 className="card-title">E-mail: {teacher.email}</h6>
            <h6 className="card-title">Subjects: {teacher.subjects}</h6>
            <h6 className="card-title">School: {}</h6>

            <center><button className="fireButton"
              onClick={() =>
                this.props
                  .fireTeacher(teacher.id)
                  .then(() => this.props.history.push("/teachers"))
              }
              
            >
              Fire the Teacher
            </button></center>
            <div className="" />
          </div>
        </div>
      </section>
    );
  }
}
