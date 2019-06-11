import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./TeacherList.css";
import "./Teacher.css";
import StudentCard from "../student/StudentCard";

class TeacherList extends Component {
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <React.Fragment>
        <div className="centerChildren">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push("/teachers/new");
            }}
          >
            Add a New Teacher
          </button>
        </div>

        <section className="">
          {this.props.teachers.map((teacher) => (
            <div key={`teacher-${teacher.id}`} teacher={teacher}>
              <div className="">
                <Link className="teacher-link" to={`/teachers/${teacher.id}`}>
                  {teacher.name}
                </Link>
              </div>

              <h6 className="">Students</h6>
              <div className="">
                {this.props.students
                  .filter((std) => std.teacherId === teacher.id)
                  .map((std) => (
                    <StudentCard key={std.id} student={std} {...this.props}  />
                  ))}
              </div>
            </div>
          ))}
        </section>
      </React.Fragment>
    );
  }
}

export default TeacherList;
