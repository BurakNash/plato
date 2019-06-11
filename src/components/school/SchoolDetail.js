import React, { Component } from "react"




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
                        
                    
                                <div className="">
                                
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}