import React, { Component } from "react";
//import { Link } from "react-router-dom";


export default class ClassroomDetail extends Component {
  render() {
    const school = this.props.schools.find(
      (a) => a.id === parseInt(this.props.match.params.schoolId)
    ) 
   


    return (
      <section className="">
        <div key={school.id} className="card">
          <div className="card-body">
            <h2 className="card-title">{school.name}</h2>
            <h6 className="card-title">Address: {school.location}</h6>
            <h6 className="card-title">Phone Number: {school.phone}</h6>
            <h6 className="card-title">
              Number of Students: {school.numberStudents}
            </h6>

            <section className="card">
              <div className="">
              <h5 className="card text-white">Teachers:</h5>
              <div className="card-body">
                {this.props.teachers
                  .filter((std) => std.schoolId === school.id )
                  .map((std) => (
                    <TeacherCard key={std.id} teacher={std} {...this.props} />
                  ))}
              </div>

              </div>



            </section>

            <div className="" />
          </div>
        </div>
      </section>
    );
  }
}
