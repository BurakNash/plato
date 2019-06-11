import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import Plato from './components/Plato'

import './index.css'

ReactDOM.render(
    <Router>
        <Plato />
    </Router>
    , document.getElementById('root'))