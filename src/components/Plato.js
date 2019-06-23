import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import JsonManager from '../modules/JsonManager';

//import { Link } from "react-router-dom";

import "./Plato.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Plato extends Component {

  state = {
    searchResults: [],
    searchInput: "",
   
  };

  constructor(props) {
    super(props);
    this.populateAppState = this.populateAppState.bind(this);
}
handleSearch(input) {
  console.log(input.target.value);
  // only search on enter/return keypress
  if (input.keyCode === 13) {
    console.log("HANDLE SEARCH - INPUT TARGET VALUE:", input.target.value);
    this.props.getSearchResults(input.target.value);
    this.props.history.push("/search");
  }
}

getSearchResults = input => {
  // console.log("GETSEARCH INPUT:", input);
  this.setState({ searchInput: input });
  let newSearchResults = [];
  JsonManager.search("students", input)
    .then(results => (newSearchResults = results))
    //  * include search across all sections below
    .then(() => JsonManager.search("teachers", input))
    .then(results => results.forEach(result => newSearchResults.push(result)))
    .then(() => JsonManager.search("schools", input))
    .then(results => results.forEach(result => newSearchResults.push(result)))
    .then(() => this.setState({ searchResults: newSearchResults }));
};



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
        
        <NavBar
        getSearchResults={this.getSearchResults}
         />
        <ApplicationViews
        populateAppState={this.populateAppState}
        registerIt={this.registerIt}
        getAllUsers={this.getAllUsers}
        addUser={this.addUser} 
        searchResults={this.state.searchResults}
          searchInput={this.state.searchInput}
          />
      </React.Fragment>
    );
  }
}

export default Plato;
