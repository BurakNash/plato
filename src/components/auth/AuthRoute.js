import React from "react"
import { Route, Redirect } from "react-router-dom"
//import Login from "../../users/Login"

const isAuthenticated = () =>
    
    sessionStorage.getItem("Fullname") !== null

const AuthRoute = ({ path, Destination, ...superProps} ) => {
    return (
        <Route exact path={path} render={props => {
            if (isAuthenticated()) {
                return <Destination {...props} {...superProps} />
            } else {
                return <Redirect to="/" />
            }
        }} />
    )
}

export default AuthRoute