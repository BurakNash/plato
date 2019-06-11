import React, { Component } from "./node_modules/react"




export default class LocationDetail extends Component {
    render() {
        const location = this.props.students.find(a =>
            a.id === parseInt(this.props.match.params.locationId))
             || {id:404, name:"404", breed: "Location not found"}

        return (
        )
    }
}