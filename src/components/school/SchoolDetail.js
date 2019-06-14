import React, { Component } from "react"
import { Link } from "react-router-dom";
import TeacherCard from "../teacher/TeacherCard";


export default class SchoolDetail extends Component {
    render() {

        const school = this.props.schools.find(a =>
            a.id === parseInt(this.props.match.params.schoolId))
             || {id:404, name:"404", grade: "School not found"}

        return (
            <section className="">
                <div key={school.id} className="card">
                    <div className="card-body">
                        <h2 className="card-title">
                            {school.name}
                        </h2>
                        <h6 className="card-title">
                            Address: {school.location}
                        </h6>
                        <h6 className="card-title">
                           Phone Number: {school.phone}
                        </h6>
                        <h6 className="card-title">
                           Number of Students: {school.numberStudents}
                        </h6>
                        

                        <h6 className="">Students</h6>

                        
                        
                        
        <section className="">
          {this.props.schools.map((school) => (
            <div key={`school-${school.id}`} school={school} >
              <div className="">
                <Link className="school-link" to={`/schools/${school.id}`}>
                  {school.name}
                </Link>
                </div>
          
              <h6 className="">Students</h6>
              <div className="">
                {this.props.teachers
                
                  .filter((std) => std.schoolId === school.id)
                  .map((std) => (
                    <TeacherCard key={std.id} teacher={std} {...this.props}  />
                  ))}
              </div>
            </div>
          ))}
        </section>
            

                        
                    
                                <div className="">
                                
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}