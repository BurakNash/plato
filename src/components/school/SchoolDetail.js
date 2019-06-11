import React, { Component } from "react"




export default class SchoolDetail extends Component {
    render() {
        const school = this.props.students.find(a =>
            a.id === parseInt(this.props.match.params.schoolId))
             || {id:404, name:"404", breed: "School not found"}

        return (<div></div>
        )
    }
}