import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import Plato from './components/Plato'
import Octicon from 'react-octicon'
//import {HashRouter} from "react-router-dom"
//import { Navbar, Nav,  NavDropdown, Button, Form, FormControl } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"

import './index.css'

ReactDOM.render(
    <Router>
        <Plato />
    </Router>
    , document.getElementById('root'))