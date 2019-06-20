import React, { Component } from "react";
import "./Teacher.css";
import StudentCard from "../student/StudentCard";


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
            <div className="teacherdata">
              <h4 className="teachername">
                {teacher.name}

                <span
                  className="octicon octicon-trashcan"
                  onClick={() =>
                    this.props
                      .deleteTeacher(teacher.id)
                      .then(() => this.props.history.push("/teachers"))
                  }
                />
                <span
                  className="octicon octicon-pencil"
                  onClick={() => {
                    this.props.history.push(`/teachers/${teacher.id}/edit`);
                  }}
                />
              </h4>
              <div className="teacherinfo">
                <h6 className="card-title">E-mail: {teacher.email}</h6>
                <h6 className="card-title">Subjects: {teacher.subjects}</h6>
                {/*<h6 className="card-title">School: {teacher.school.name}</h6>*/}
              </div>
            </div>

            <div className="" />

            <h6 className="page-header studentdetails">Students:</h6>

            {this.props.students
              .filter((std) => std.teacherId === teacher.id)
              .map((std) => (
                <StudentCard key={std.id} student={std} {...this.props} />
              ))}
          </div>
        </div>
      </section>
    );
  }
}
