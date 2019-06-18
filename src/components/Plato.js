import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import JsonManager from '../modules/JsonManager';


import "./Plato.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Plato extends Component {
  constructor(props) {
    super(props);
    this.populateAppState = this.populateAppState.bind(this);
}

populateAppState() {
    JsonManager.getAll("users").then((users) => {
        this.setState({ users: users });
    });
}

componentDidMount() {
    this.populateAppState();
}
registerIt = (username, password, firstName) => {
    return JsonManager.registerIt(username, password, firstName);
};

getAllUsers = () => {
    return JsonManager.getAll("users");
};

addUser = (user) =>
    JsonManager.post("users", user)
        .then(() => this.populateAppState())
        .then(() => this.registerIt(user.username, user.password));

isAuthenticated = () => sessionStorage.getItem("User") !== null;
;
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <ApplicationViews
        populateAppState={this.populateAppState}
        registerIt={this.registerIt}
        getAllUsers={this.getAllUsers}
        addUser={this.addUser} />
      </React.Fragment>
    );
  }
}

export default Plato;
