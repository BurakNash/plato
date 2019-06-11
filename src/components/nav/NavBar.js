import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css";


class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar- fixed-top dark-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Locations</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/students">Students</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/teachers">Teachers</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar